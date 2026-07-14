import { describe, it, expect, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import CubeComponent from "@/components/CubeComponent.vue";
import SideComponent from "@/components/SideComponent.vue";

describe("CubeComponent.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has 6 child SideComponent", () => {
    const wrapper = shallowMount(CubeComponent, {
      props: {
        rotateX: -18,
        rotateY: 36
      }
    });
    expect(wrapper.findAllComponents(SideComponent).length).toBe(6);
  });
});
