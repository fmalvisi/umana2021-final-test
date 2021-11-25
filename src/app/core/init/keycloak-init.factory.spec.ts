import { initializeKeycloak } from './keycloak-init.factory';

describe('KeycloakInit', () => {
  it('initializeKeycloak', () => {
    expect(initializeKeycloak).toBeTruthy();
  });
});
