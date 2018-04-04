import React from 'react';
import { ScrollView, StyleSheet, } from 'react-native';
import { connect } from "react-redux";
import { manual } from "../../actions/manual";
import ManualItem from "./ManualItem";
import { ActivityOverlay } from "../index";

class Manual extends React.Component {

  componentDidMount() {
    this.props.getManual();
  }

  render() {
    return (
      this.props.manualInProgress ?
        <ActivityOverlay condition={this.props.manualInProgress} /> :
        <ScrollView style={styles.container}>
          {
            this.props.manual && this.props.manual.map((entry, index) => {
                return <ManualItem key={index} entry={entry} />
              }
            )
          }
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => (
  {
    manual: state.manual,
    manualFailed: state.manualFailed,
    manualInProgress: state.manualInProgress,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getManual: () => dispatch(manual()),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(Manual);