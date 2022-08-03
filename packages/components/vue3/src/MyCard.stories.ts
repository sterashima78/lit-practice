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
      methods: {
        log: (a: unknown) => console.log(a),
      },
      template: /*html*/ `
                <v-my-card>
                    <template #header>
                        <span>Header</span>
                    </template>
                    <template #default>
                        <button @click="log('click btn')">log</button>
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
