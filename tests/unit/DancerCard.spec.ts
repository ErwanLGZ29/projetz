import { shallowMount } from "@vue/test-utils";
import DancerCard from "../../components/DancerCard.vue";

interface DancerCardProps {
    dancer: {
        type: Object,
        required: true,
    },
}

describe("DescCard.vue", () => {
  it("renders props when passed", () => {
    const imageSrc: string = "/hong10.png";
    const name: string = "hong10";
    const ranking: string = "Test ranking";
   
    const  dancer: Object = {
        image: imageSrc,
        name: name,
        ranking: ranking,
    };

    const wrapper = shallowMount(DancerCard, {
      propsData: { dancer } as DancerCardProps,
    });

    expect(wrapper.find("p.name").text()).toBe(name);
    expect(wrapper.find("p.ranking").text()).toBe(ranking);
    expect(wrapper.find("img").attributes("src")).toBe(imageSrc);
  });
});
