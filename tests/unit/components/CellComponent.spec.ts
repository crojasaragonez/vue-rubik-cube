import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CellComponent from "@/components/CellComponent.vue";
import { Color } from "@/enums";

describe("CellComponent.vue", () => {
  const wrapper = shallowMount(CellComponent, {
    propsData: { color: Color.Orange, x: 0, y: 0 }
  });

  it("has the right text", () => {
    expect(wrapper.text()).to.eq("0,0");
  });

  it("has the right css class", () => {
    expect(wrapper.classes()).to.eql(["cell", "orange"]);
  });
});
