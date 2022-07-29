import { Meta, StoryObj } from "@storybook/vue3";
import { VMyCard } from "./generated/";
const meta: Meta = {
  component: VMyCard,
};

export default meta;

export const Test: StoryObj = {
  render() {
    return {
      components: {
        VMyCard,
      },
      template: /*html*/ `
                <v-my-card>
                    <template #header>
                        <span>Header</span>
                    </template>
                    <template #default>
                        <p>content</p>
                        <p>content</p>
                        <p>content</p>
                        <p>content</p>
                        <p>content</p>
                        <p>content</p>
                    </template>
                </v-my-card>
            `,
    };
  },
};
