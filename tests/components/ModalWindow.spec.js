import { mount } from '@vue/test-utils'
import { ModalWindowType } from '@/const'
import ModalWindow from '@/components/ModalWindow.vue'

describe('ModalWindow.vue', () => {
  const message = 'message'

  const questData = {
    adId: 'Ln859bV7',
    expiresIn: 4,
    message: 'Help Menes Rennold to transport a magic turnips to grassland in Everdrone',
    probability: 'Piece of cake',
    reward: 15
  }

  const itemData = {
    cost: 50,
    id: 'hpot',
    name: 'Healing potion'
  }

  const provide = () => {
    return {
      showOverlay() {},
      hideOverlay() {}
    }
  }

  const questWrapper = mount(ModalWindow, {
    propsData: { type: ModalWindowType.QUEST, data: questData },
    provide
  })

  const questResultWrapper = mount(ModalWindow, {
    propsData: { type: ModalWindowType.QUEST_RESULT, data: { message } },
    provide
  })

  const purchaseWrapper = mount(ModalWindow, {
    propsData: { type: ModalWindowType.PURCHASE_ITEM, data: itemData },
    provide
  })

  const purchaseResultWrapper = mount(ModalWindow, {
    propsData: { type: ModalWindowType.PURCHASE_RESULT, data: { message } },
    provide
  })

  const gameOverWrapper = mount(ModalWindow, {
    propsData: { type: ModalWindowType.GAME_OVER, data: { message } },
    provide
  })

  it('matches snapshot', () => {
    expect(questWrapper.element).toMatchSnapshot()
  })

  it('displays proper text for quest', () => {
    const tileElement = questWrapper.find('.modal-window__title')
    const textElements = questWrapper.findAll('.modal-window__text').wrappers

    expect(tileElement.text()).toBe('Try this quest?')
    expect(textElements[0].text()).toBe(questData.message)
    expect(textElements[1].text()).toBe(`Reward: ${questData.reward}`)
    expect(textElements[2].text()).toBe(`Difficulty: ${questData.probability}`)
    expect(textElements[3].text()).toBe(`Turns before expiration: ${questData.expiresIn}`)
  })

  it('displays proper text for item', () => {
    const tileElement = purchaseWrapper.find('.modal-window__title')
    const textElements = purchaseWrapper.findAll('.modal-window__text').wrappers

    expect(tileElement.text()).toBe('Buy this item?')
    expect(textElements[0].text()).toBe(itemData.name)
    expect(textElements[1].text()).toBe(`Price: ${itemData.cost}`)
  })

  it('displays proper text for quest result, purchase result and game over', () => {
    const questResultMessage = questResultWrapper.find('.modal-window__text')
    const purchaseResultMessage = purchaseResultWrapper.find('.modal-window__text')
    const gameOverMessage = gameOverWrapper.find('.modal-window__text')

    expect(questResultMessage.text()).toBe(message)
    expect(purchaseResultMessage.text()).toBe(message)
    expect(gameOverMessage.text()).toBe(message)
  })

  it('displays proper buttons for quest and purchase', () => {
    const questButtonElements = questWrapper.findAll('.modal-window__button').wrappers
    const purchaseButtonElements = purchaseWrapper.findAll('.modal-window__button').wrappers

    expect(questButtonElements.length).toBe(2)
    expect(purchaseButtonElements.length).toBe(2)
    expect(questButtonElements[0].text().includes('Yes')).toBeTruthy()
    expect(questButtonElements[1].text().includes('No')).toBeTruthy()
    expect(purchaseButtonElements[0].text().includes('Yes')).toBeTruthy()
    expect(purchaseButtonElements[1].text().includes('No')).toBeTruthy()
  })

  it('displays proper buttons for quest result, purchase result and game over', () => {
    const questResultButtonElements = questResultWrapper.findAll('.modal-window__button').wrappers
    const purchaseResultButtonElements = purchaseResultWrapper.findAll('.modal-window__button').wrappers
    const gameOvertButtonsElements = gameOverWrapper.findAll('.modal-window__button').wrappers

    expect(questResultButtonElements.length).toBe(1)
    expect(purchaseResultButtonElements.length).toBe(1)
    expect(gameOvertButtonsElements.length).toBe(1)
    expect(questResultButtonElements[0].text().includes('OK')).toBeTruthy()
    expect(purchaseResultButtonElements[0].text().includes('OK')).toBeTruthy()
    expect(gameOvertButtonsElements[0].text().includes('OK')).toBeTruthy()
  })

  it('pressing buttons when type is quest emits corresponding events', () => {
    const questButtonElements = questWrapper.findAll('.modal-window__button').wrappers

    questButtonElements[0].trigger('click')
    expect(questWrapper.emitted().confirm.length).toBe(1)
    expect(questWrapper.emitted().confirm[0]).toEqual([ModalWindowType.QUEST])

    questButtonElements[1].trigger('click')
    expect(questWrapper.emitted().close.length).toBe(1)
    expect(questWrapper.emitted().close[0]).toEqual([ModalWindowType.QUEST])
  })

  it('pressing buttons when type is purchase emits corresponding events', () => {
    const purchaseButtonElements = purchaseWrapper.findAll('.modal-window__button').wrappers

    purchaseButtonElements[0].trigger('click')
    expect(purchaseWrapper.emitted().confirm.length).toBe(1)
    expect(purchaseWrapper.emitted().confirm[0]).toEqual([ModalWindowType.PURCHASE_ITEM])

    purchaseButtonElements[1].trigger('click')
    expect(purchaseWrapper.emitted().close.length).toBe(1)
    expect(purchaseWrapper.emitted().close[0]).toEqual([ModalWindowType.PURCHASE_ITEM])
  })

  it('pressing buttons when type is quest result emits corresponding events', () => {
    const questResultButtonElement = questResultWrapper.find('.modal-window__button')

    questResultButtonElement.trigger('click')
    expect(questResultWrapper.emitted().close.length).toBe(1)
    expect(questResultWrapper.emitted().close[0]).toEqual([ModalWindowType.QUEST_RESULT])
  })

  it('pressing buttons when type is purchase result emits corresponding events', () => {
    const purchaseResultButtonElement = purchaseResultWrapper.find('.modal-window__button')

    purchaseResultButtonElement.trigger('click')
    expect(purchaseResultWrapper.emitted().close.length).toBe(1)
    expect(purchaseResultWrapper.emitted().close[0]).toEqual([ModalWindowType.PURCHASE_RESULT])
  })

  it('pressing buttons when type is game over emits corresponding events', () => {
    const gameOverButtonElement = gameOverWrapper.find('.modal-window__button')

    gameOverButtonElement.trigger('click')
    expect(gameOverWrapper.emitted().close.length).toBe(1)
    expect(gameOverWrapper.emitted().close[0]).toEqual([ModalWindowType.GAME_OVER])
  })

  it('calls the injected functions when created and destroyed', () => {
    const showOverlay = jest.fn()
    const hideOverlay = jest.fn()

    const wrapper = mount(ModalWindow, {
      propsData: { type: ModalWindowType.QUEST, data: questData },
      provide: { showOverlay, hideOverlay }
    })

    expect(showOverlay).toHaveBeenCalled()

    wrapper.destroy()

    expect(hideOverlay).toHaveBeenCalled()
  })
})
