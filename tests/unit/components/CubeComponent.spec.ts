import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CubeComponent from "@/components/CubeComponent.vue";
import SideComponent from "@/components/SideComponent.vue";
import Store from "@/store";

describe("CubeComponent.vue", () => {
  it("has 6 child SideComponent", () => {
    const wrapper = shallowMount(CubeComponent, {
      store: Store,
      propsData: {
        rotateX: -18,
        rotateY: 36
      }
    });
    expect(wrapper.findAllComponents(SideComponent).length).to.eq(6);
  });
});
