import { shallowMount } from '@vue/test-utils'
import GameItems from '@/components/GameItems.vue'

describe('GameItems.vue', () => {
  const items = [
    {
      cost: 50,
      id: 'hpot',
      name: 'Healing potion'
    },
    {
      cost: 100,
      id: 'tricks',
      name: 'Book of Tricks'
    },
    {
      cost: 300,
      id: 'mtrix',
      name: 'Book of Megatricks'
    }
  ]

  const wrapper = shallowMount(GameItems, {
    propsData: { items }
  })

  const itemElements = wrapper.findAll('.game-items__item')

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays all of the items', () => {
    expect(itemElements.length).toBe(items.length)
  })

  it('displays all item data correctly', () => {
    itemElements.wrappers.forEach((element, index) => {
      const itemDataElements = element.findAll('.game-items__item-data').wrappers
      expect(itemDataElements[0].text()).toBe(items[index].name)
      expect(itemDataElements[1].text()).toBe(`Price: ${items[index].cost}`)
    })
  })

  it('emits itemClick event with the item id on item click', () => {
    itemElements.wrappers.forEach((element, index) => {
      element.trigger('click')
      expect(wrapper.emitted().itemClick[index]).toEqual([items[index].id])
    })
  })
})
