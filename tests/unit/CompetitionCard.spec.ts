import { shallowMount } from '@vue/test-utils';
import CompetitionCard from '../../components/CompetitionCard.vue';

interface CompetitionCardProps {
  imageSrc: string;
  imageAlt: string;
  competitionName: string; 
  competitionPlace: string;
  competitionDate: string;
}

describe('CompetitionCard.vue', () => {
  it('renders props when passed', () => {
    const imageSrc: string = '/bcone.jpg';
    const imageAlt: string = 'RedBull BC One';
    const competitionName: string = 'RedBull BC One';
    const competitionPlace: string = 'Le lieu de la finale change chaque année.';
    const competitionDate: string = 'Novembre';

    const wrapper = shallowMount(CompetitionCard, {
      propsData: { imageSrc, imageAlt, competitionName, competitionPlace, competitionDate } as CompetitionCardProps
    });

    expect(wrapper.find('p').text()).toBe(competitionName);
    expect(wrapper.find('img').attributes('src')).toBe(imageSrc);
  });
});