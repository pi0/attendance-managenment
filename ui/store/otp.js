import totpToken from 'otplib/core/totpToken';

export default {
  state() {
    return {
      //TODO: make random secret
      secret: 'GFJXE6STPBNFKS2EJBXESMLPN52FI4LC',
      token: '-'
    }
  },
  mutations: {
    UPDATE(state) {
      state.token = totpToken(state.secret, {
        step: 30
      })
    }
  }
}
