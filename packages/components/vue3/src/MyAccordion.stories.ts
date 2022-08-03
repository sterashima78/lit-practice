import { Meta, StoryObj } from "@storybook/vue3";
import { VMyAccordion } from "./generated/";
const meta: Meta = {
  component: VMyAccordion,
};

export default meta;

export const Test: StoryObj = {
  render() {
    return {
      components: {
        VMyAccordion,
      },
      template: /*html*/ `
                <v-my-accordion 
                    @toggle="(a)=> log(['toggle', a])"
                    @close="(a)=> log(['close', a])"
                    @open="(a)=> log(['open', a])"
                >
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
                </v-my-accordion>
            `,
      methods: {
        log(a: unknown) {
          console.log(a);
        },
      },
    };
  },
};
