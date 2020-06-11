import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SideComponent from "@/components/SideComponent.vue";
import CellComponent from "@/components/CellComponent.vue";
import { Side } from "@/models";
import { Color, SidePosition } from "@/enums";

describe("SideComponent.vue", () => {
  it("has 9 child CellComponents", () => {
    const wrapper = shallowMount(SideComponent, {
      propsData: { side: new Side(Color.Green, SidePosition.Left) }
    });
    expect(wrapper.findAllComponents(CellComponent).length).to.eq(9);
  });
});
