import { Input, Select, Textarea } from "brainly-style-guide";
import { Component } from "react";

export default class Subcategories extends Component<
  { reason, subcategory, setSubcategory, repData, setRep }> {
  constructor(props) {
    super(props);
    
    this.props.setRep("");

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.setRep(event.target.value);
  }

  render() {
    return (
      <>
        <Select
          onChange={
            (e) => {
              let eventTarget = e.target as HTMLInputElement;
              this.props.setSubcategory(+eventTarget.value);
            }
          }
          options = {
            this.props.reason.subcategories.map(item => {
              return {
                text: item.text,
                value: item.id + ""
              };
            })
          }
        />
        {
          this.props.reason.subcategories.find(
            (subcat) => subcat.id === this.props.subcategory
          )?.data?.type === "text" &&
            <Input
              type="text" 
              className = "reportData" 
              
              onChange = { this.handleChange }
              value = { this.props.repData } 
            />
        }
        {
          this.props.reason.subcategories.find(
            (subcat) => subcat.id === this.props.subcategory
          )?.data?.type === "textarea" &&
            <Textarea
              type="text" 
              className = "reportData" 
              
              onChange = { this.handleChange }
              value = { this.props.repData } 
            />
        }
      </>
    );
  }
}