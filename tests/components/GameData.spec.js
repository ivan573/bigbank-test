import { shallowMount } from '@vue/test-utils'
import GameData from '@/components/GameData.vue'

describe('GameData.vue', () => {
  const data = {
    lives: 3,
    gold: 0,
    level: 0,
    turn: 0,
    score: 0
  }

  const wrapper = shallowMount(GameData, {
    propsData: { data }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays all the data from props properly', () => {
    const itemElements = wrapper.findAll('.game-data__item')

    expect(itemElements.at(0).text()).toMatch(`Lives: ${data.lives}`)
    expect(itemElements.at(1).text()).toMatch(`Gold: ${data.gold}`)
    expect(itemElements.at(2).text()).toMatch(`Level: ${data.level}`)
    expect(itemElements.at(3).text()).toMatch(`Turn: ${data.turn}`)
    expect(itemElements.at(4).text()).toMatch(`Score: ${data.score}`)
  })
})
