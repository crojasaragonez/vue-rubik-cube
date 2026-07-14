import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CellComponent from "@/components/CellComponent.vue";
import { Color } from "@/enums";
import { Cell } from "@/models";

describe("CellComponent.vue", () => {
  const wrapper = shallowMount(CellComponent, {
    props: { cell: new Cell(Color.Orange, 0, 0) }
  });

  it("has the right text", () => {
    expect(wrapper.text()).toBe("0,0");
  });

  it("has the right css class", () => {
    expect(wrapper.classes()).toEqual(["cell", "orange"]);
  });
});
