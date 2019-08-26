import React from 'react';
//----------------------------------FORM ELEMENTS--------------------------------//


const Button = (props) => {
    const text = props.hasOwnProperty('text') ? props.text : props.children;
    return (
        <button onClick={props.onClick}>
            {text}
        </button>
    )
};

//use onChangeText instead of onChange for compatability with native
export const ManagedTextInput = (props) => {
  const onChange = (e) => {
    if ( props.hasOwnProperty('onChange')) {
    props.onChange(e);
    }
    if ( props.hasOwnProperty('onChangeText')) {
    props.onChangeText(e.target.value);
    }
  }
    return (
      <>
      {props.hasOwnProperty('label') && 
        <label for={props.id}>{props.label}</label>}
      <input type="text" id={props.id} name={props.id} value={props.value} onChange={onChange}/>
        </>
    )
};

const ManagedSelect = (props) => (
    <select id={props.id} name={props.name} value={props.selected} onChange={props.onChange} >
        {props.children}
    </select>
);

const Option = (props) => {
    const label = props.label || props.value;
    return (
        <option value={props.value}>
            {label}
        </option>
    )
};

const OptionList = (props) => {
    //takes an array of values
    //and an optional second array of values
    const labels = props.labels || props.values;
    return (
        props.values.map( (value, i) =>
            <Option value={value} label={labels[i]} />
        )
    );
};

const CategoryOptions = () => {
    //takes the taxonomy name

};

const TaxonomyOptions = ( props ) => {
    //takes the taxonomy name

};

/*
const OptionList = (props) => {
    //options can be an array of values,
    //or an array of objects
    const getOptionProps = (item) => {
        if ( typeof( item ) === 'number' || typeof( item ) === 'string' ) {
            return {
                label: item,
                value: item
            }
        } else {
            return item;
        }
    };
    return (
            props.options.map( value =>
                <Option {...getOptionProps(value)} />
            )
        );
};*/

class ManagedForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
    }
    componentDidMount() {
        /*if ( this.props.hasOwnProperty('initialState') ) {
            Object.keys( this.props.intialState ).map( name =>
        }*/
        const initialState = this.props.initialState;
        if ( initialState ) {
            this.setState({initialState});
        }
        console.log( this.state );
    }

    handleChange = (event) => {
        //can save multiple form elements by name
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSelectChange = (event) => {
        //can save multiple form elements by name
        this.setState({ [event.target.name]: event.target.value });
    };

    handleInputChange = (event) => {

    };

    render() {
        return;
    }
}