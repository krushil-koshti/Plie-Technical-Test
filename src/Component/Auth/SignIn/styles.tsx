import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Constants/Colors';
import FontSize from '../../../Constants/FontSize';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    height: height * 0.35,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoText: {
    fontSize: 72,
    fontWeight: '300',
    color: Colors.black,
    letterSpacing: 2,
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  placeholderIcon: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
    tintColor:'#000000'
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  forgotPasswordText: {
    fontSize: FontSize.xs,
    color: Colors.subtitle,
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 24,
  },
  signInButton: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpContainer: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 36,
  },
  signUpText: {
    fontSize: FontSize.xs,
    color: Colors.black,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4F4F4F',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: FontSize.xs,
    color: '#4F4F4F',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socialButtonFacebookImage: {
    width: 50,
    height: 50,
    marginHorizontal: 12,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socialIconFull: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  guestContainer: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    paddingTop: 20,
  },
  guestText: {
    fontSize: FontSize.xs,
    color: Colors.subtitle,
  },
});

export default styles;
