import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RNModal from 'react-native-modal';
export const Modal = ({isVisible = false, children, ...props}) => {
  return (
    <RNModal
      isVisible={isVisible}
      hideModalContentWhileAnimating={true}
      animationInTiming={10}
      animationOutTiming={10}
      backdropTransitionInTiming={10}
      backdropTransitionOutTiming={10}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({title}) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({children}) => <View style={styles.body}>{children}</View>;

const ModalFooter = ({children}) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    minHeight: 50,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 25,
    flexDirection: 'row',
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
