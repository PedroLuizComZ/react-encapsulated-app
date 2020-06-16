import React, { Component } from "react";
import {
  WebView,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { Env } from "./Env.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    const EnvValue = Env();

    this.state = {
      webheight: 100,
      url: EnvValue.apiUrl,
      color: EnvValue.color,
    };
  }

  render() {
    renderLoading = () => (
      <ActivityIndicator
        animating
        style={{ flex: 1 }}
        color={this.state.color}
        size="large"
      />
    );

    const webViewScript = `
    setTimeout(function() { 
      window.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
    `;

    return (
      <SafeAreaView style={styles.container}>
        <WebView
          style={{ height: this.state.webheight }}
          onError={() => alert("Teste")}
          startInLoadingState={true}
          renderLoading={renderLoading}
          source={{ uri: this.state.url }}
          style={{ marginTop: 20 }}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={false}
          onMessage={(event) => {
            this.setState({ webheight: parseInt(event.nativeEvent.data) });
          }}
          javaScriptEnabled={true}
          injectedJavaScript={webViewScript}
          domStorageEnabled={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
