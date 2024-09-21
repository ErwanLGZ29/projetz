import { shallowMount } from '@vue/test-utils';
import CardDesc from '../../components/CardDesc.vue';

interface CardDescProps {
  imageSrc: string;
  imageAlt: string;
  description: string;
  alternative?: boolean;
}

describe('CardDesc.vue', () => {
  it('renders props when passed', () => {
    const imageSrc: string = '/hong10.png';
    const imageAlt: string = 'hong10';
    const description: string = 'Test description';

    const wrapper = shallowMount(CardDesc, {
      propsData: { imageSrc, imageAlt, description } as CardDescProps
    });

    expect(wrapper.find('p').text()).toBe(description);
    expect(wrapper.find('img').attributes('src')).toBe(imageSrc);
  });

  it('displays text before image when "alternative" is true', () => {
    const wrapper = shallowMount(CardDesc, {
      propsData: {
        imageSrc: '/yuasa.jpg',
        imageAlt: 'yuasa',
        description: 'Test Description 2',
        alternative: true
      } as CardDescProps
    });

    const firstChild = wrapper.find('.card-container').element.children[0];
    expect(firstChild.tagName).toBe('DIV');
  });
});