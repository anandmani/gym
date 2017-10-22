import React, { PureComponent } from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import Card from './Card'
import _ from 'lodash'

const dragScrollThreshold = 20

export default class Dnd extends PureComponent {

  state = {
    cards: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  containerView = null
  containerViewBounds = {
    top: null,
    bottom: null,
    dragScrollThresholdTop: null,
    dragScrollThresholdBottom: null
  }

  scrollView = null
  scrollOffset = 0

  locationMap = {}
  children = []
  childrenMeta = []
  draggedCardOriginalIndex = null

  generateId = () => Math.floor(Math.random() * 10000)

  getChildMeta = (index, ox, oy, width, height, px, py) => {
    this.childrenMeta[index] = {
      height,
      midY: py + height / 2
    }
  }

  getChildrenMeta = () => {
    this.children.map((child, index) => {
      child.element.measure(this.getChildMeta.bind(null, index))
    })
  }

  getContainerViewBounds = (ox, oy, width, height, px, py) => {
    this.containerViewBounds = {
      top: py,
      bottom: py + height,
      dragScrollThresholdTop: py + dragScrollThreshold,
      dragScrollThresholdBottom: py + height - dragScrollThreshold
    }
  }

  componentDidMount() {
    setTimeout(() => { //inside setTimeout to wait for native render to finish
      this.getChildrenMeta()
      this.containerView.measure(this.getContainerViewBounds)
    })
  }

  shiftCard = (card, height) => {
    let prevTop = card.elementStyles.style.top
    card.elementStyles = ({
      style: {
        top: prevTop + height
      }
    })
    card.updateNativeStyles()
  }

  handleDragStart = (id) => {
    this.draggedCardOriginalIndex = this.locationMap[id]
  }

  //We are thorttling this because, scrollTo (takes some time to do/ done asyn?). Thus, it cannot keep up with updateNativeStyles.
  scrollDown = _.throttle((index) => {
    this.scrollView.scrollTo({ y: this.scrollOffset + 10, animated: false })
    this.children[index].previousTop += 10  //Pulling the dragged card along with scroll
    this.children[index].updateNativeStyles()
  }, 100)

  scrollUp = _.throttle((index) => {
    this.scrollView.scrollTo({ y: this.scrollOffset - 10, animated: false })
    this.children[index].previousTop -= 10  //Pulling the dragged card along with scroll
    this.children[index].updateNativeStyles()
  }, 100)

  handleDrag = (id, pos) => {
    const index = this.locationMap[id]

    //Check if we need to scroll
    if (pos > this.containerViewBounds.dragScrollThresholdBottom && index !== this.children.length - 1) {
      this.scrollDown(index)
    }
    else if (pos < this.containerViewBounds.dragScrollThresholdTop && index !== 0) {
      this.scrollUp(index)
    }

    pos = this.scrollOffset + pos //Card positions are computed on componentDidMount which are at scroll = 0. Therefore, adding scrollOffet to position. (pageY is based on the screen. top-left of screen corresponds to pageY = 0. If we scroll down, the already computed midY is not valid. Hence we add scrollOffset)
    if (index !== this.children.length - 1 && pos > this.childrenMeta[index + 1].midY) {
      this.shiftCard(this.children[index + 1], -1 * this.childrenMeta[index].height) //shift next card up
      //Updating this.locationMap
      this.locationMap[id] = index + 1
      this.locationMap[this.children[index + 1].id] = index
      //Updating this.children
      const temp = this.children[index + 1]
      this.children[index + 1] = this.children[index]
      this.children[index] = temp

    }
    else if (index !== 0 && pos < this.childrenMeta[index - 1].midY) {
      this.shiftCard(this.children[index - 1], this.childrenMeta[index].height) //shift prev card down
      //Updating this.locationMap
      this.locationMap[id] = index - 1
      this.locationMap[this.children[index - 1].id] = index
      //Updating this.children
      const temp = this.children[index]
      this.children[index] = this.children[index - 1]
      this.children[index - 1] = temp
    }
  }

  handleDragEnd = (id) => {
    let newCards = [...this.state.cards]
    let draggedCard = newCards.splice(this.draggedCardOriginalIndex, 1)[0]
    newCards.splice(this.locationMap[id], 0, draggedCard)
    this.setState({
      cards: newCards
    })
    this.draggedCardOriginalIndex = null
  }

  renderCard = (item, index) => {
    const id = this.generateId()
    this.locationMap[id] = index  //setting position of card `id`
    return (
      <Card
        key={item}
        ref={(element) => this.children[index] = element}
        value={item}
        id={id}
        style={styles.card}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      />
    )
  }

  setScrollOffset = (e) => {
    this.scrollOffset = e.nativeEvent.contentOffset.y
  }

  render() {
    return (
      <View
        collapsable={false}
        ref={(element) => this.containerView = element}
        style={styles.container}
      >
        <ScrollView
          onScroll={this.setScrollOffset}
          ref={(element) => this.scrollView = element}
          style={styles.scrollView}
        >
          {
            this.state.cards.map(this.renderCard)
          }
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  scrollView: {
  },
  container: {
    flex: 1
  }
})

