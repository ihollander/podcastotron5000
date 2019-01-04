import React from "react";
import { Form, Icon, Accordion } from "semantic-ui-react";

class EpisodeFilter extends React.Component {
  state = { activeIndex: -1 };

  onAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { term, onInputChange } = this.props;
    const { activeIndex } = this.state;
    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.onAccordionClick}
        >
          <Icon name="dropdown" />
          Filter Episodes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form>
            <Form.Field>
              <input
                type="text"
                name="term"
                placeholder="Episode name..."
                value={term}
                onChange={onInputChange}
              />
            </Form.Field>
          </Form>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default EpisodeFilter;
