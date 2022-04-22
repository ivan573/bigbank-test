import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { Route } from '@/router/index'
import ReputationView from '@/views/ReputationView.vue'

describe('ReputationView.vue', () => {
  const gameId = 'gameId'
  const reputationArray = [
    {
      name: 'people',
      value: 1.5
    },
    {
      name: 'state',
      value: 1
    },
    {
      name: 'underworld',
      value: 1
    }
  ]

  const wrapper = mount(ReputationView, {
    computed: {
      gameId() { return gameId },
      reputationArray() { return reputationArray }
    }
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays reputation for each element from the array', () => {
    const reputationElements = wrapper.findAll('.reputation__list-item').wrappers

    expect(reputationElements.length).toBe(reputationArray.length)
    reputationElements.forEach((element, index) => {
      expect(element.text()).toBe(`${reputationArray[index].name}: ${reputationArray[index].value}`)
    })
  })

  it('redirects to root path if the game is not initialized', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const router = new VueRouter()
    router.push(Route.REPUTATION)

    const wrapper = shallowMount(ReputationView, {
      localVue,
      router,
      computed: {
        gameId() { return null },
        reputationArray() { return [] }
      }
    })

    expect(wrapper.vm.$route.path).toBe(Route.HOME)
  })
})
