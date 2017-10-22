import React, { PureComponent } from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import Card from './Card'

export default class Dnd extends PureComponent {

  state = {
    cards: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

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

  componentDidMount() {
    setTimeout(() => { //inside setTimeout to wait for native render to finish
      this.children.map((child, index) => {
        child.element.measure(this.getChildMeta.bind(null, index))
      })
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

  handleDrag = (id, pos) => {
    const index = this.locationMap[id]
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

  render() {
    return (
      <View style={{ backgroundColor: this.state.bg }}>
        {
          this.state.cards.map(this.renderCard)
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey'
  }
})

