import React from "react";
import { View, ActivityIndicator } from "react-native";

import globalStyles from "../../constant/stylesSheet";

const AlertIndicator = (props) => {
  return (
    <View style={globalStyles.indicator}>
      <ActivityIndicator
        size="large"
        animating={props.isActiveIndicator}
        color="#bc2b78"
      />
    </View>
  );
};

export default AlertIndicator;
