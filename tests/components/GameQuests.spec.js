import { shallowMount } from '@vue/test-utils'
import GameQuests from '@/components/GameQuests.vue'

describe('GameQuests.vue', () => {
  const quests = [
    {
      adId: 'Ln859bV7',
      expiresIn: 4,
      message: 'Help Menes Rennold to transport a magic turnips to grassland in Everdrone',
      probability: 'Piece of cake',
      reward: 15

    },
    {
      adId: 'lBxlpzxe',
      expiresIn: 5,
      message: 'Help Viriato Ásmundsdóttir to sell an unordinary water on the local market',
      probability: 'Walk in the park',
      reward: 10

    },
    {
      adId: 'bauDDuqQ',
      expiresIn: 3,
      message: 'Help Chingis Chandler to fix their horse',
      probability: 'Quite likely',
      reward: 8

    }
  ]

  const wrapper = shallowMount(GameQuests, {
    propsData: { quests }
  })

  const questElements = wrapper.findAll('.game-quests__quest')

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays all of the items', () => {
    expect(questElements.length).toBe(quests.length)
  })

  it('displays all item data correctly', () => {
    questElements.wrappers.forEach((element, index) => {
      const itemDataElements = element.findAll('.game-quests__quest-text').wrappers
      expect(itemDataElements[0].text()).toBe(quests[index].message)
      expect(itemDataElements[1].text()).toBe(`Reward: ${quests[index].reward}`)
      expect(itemDataElements[2].text()).toBe(`Difficulty: ${quests[index].probability}`)
      expect(itemDataElements[3].text()).toBe(`Turns before expiration: ${quests[index].expiresIn}`)
    })
  })

  it('emits itemClick event with the item id on item click', () => {
    questElements.wrappers.forEach((element, index) => {
      element.trigger('click')
      expect(wrapper.emitted().questClick[index]).toEqual([quests[index].adId])
    })
  })
})
