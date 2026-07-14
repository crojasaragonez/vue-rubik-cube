import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import SideComponent from "@/components/SideComponent.vue";
import CellComponent from "@/components/CellComponent.vue";
import { Side } from "@/models";
import { Color, SidePosition } from "@/enums";

describe("SideComponent.vue", () => {
  it("has 9 child CellComponents", () => {
    const wrapper = shallowMount(SideComponent, {
      props: { side: new Side(Color.Green, SidePosition.Left) }
    });
    expect(wrapper.findAllComponents(CellComponent).length).toBe(9);
  });
});
