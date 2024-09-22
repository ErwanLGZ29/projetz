import { shallowMount } from '@vue/test-utils';
import DescCard from '../../components/DescCard.vue';

interface DescCardProps {
  imageSrc: string;
  imageAlt: string;
  description: string;
  alternative?: boolean;
}

describe('DescCard.vue', () => {
  it('renders props when passed', () => {
    const imageSrc: string = '/hong10.png';
    const imageAlt: string = 'hong10';
    const description: string = 'Test description';

    const wrapper = shallowMount(DescCard, {
      propsData: { imageSrc, imageAlt, description } as DescCardProps
    });

    expect(wrapper.find('p').text()).toBe(description);
    expect(wrapper.find('img').attributes('src')).toBe(imageSrc);
  });

  it('displays text before image when "alternative" is true', () => {
    const wrapper = shallowMount(DescCard, {
      propsData: {
        imageSrc: '/yuasa.jpg',
        imageAlt: 'yuasa',
        description: 'Test Description 2',
        alternative: true
      } as DescCardProps
    });

    const firstChild = wrapper.find('.card-container').element.children[0];
    expect(firstChild.tagName).toBe('DIV');
  });
});