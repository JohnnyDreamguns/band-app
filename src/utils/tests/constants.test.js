import { RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT } from '../constants';

describe('RESTART_ON_REMOUNT', () => {
  it('should have the correct value', () => {
    expect(RESTART_ON_REMOUNT).toEqual('@@saga-injector/restart-on-remount');
  });
});

describe('DAEMON', () => {
  it('should have the correct value', () => {
    expect(DAEMON).toEqual('@@saga-injector/daemon');
  });
});

describe('ONCE_TILL_UNMOUNT', () => {
  it('should have the correct value', () => {
    expect(ONCE_TILL_UNMOUNT).toEqual('@@saga-injector/once-till-unmount');
  });
});
