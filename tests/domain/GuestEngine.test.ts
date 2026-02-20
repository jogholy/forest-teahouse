import { describe, it, expect, beforeEach } from 'vitest';
import { GuestEngine } from '../../src/domain/services/GuestEngine';
import { guestPool } from '../../src/domain/data/guestPool';
import { GuestType } from '../../src/domain/models/Guest';

describe('GuestEngine', () => {
  let engine: GuestEngine;

  beforeEach(() => {
    engine = new GuestEngine();
  });

  it('should generate common guest by default', () => {
    const guest = engine.generateGuest(guestPool);
    expect(guest.type).toBe(GuestType.COMMON);
  });

  it('should generate special guest every 5 visits', () => {
    for (let i = 0; i < 4; i++) {
      engine.generateGuest(guestPool);
    }
    const guest = engine.generateGuest(guestPool);
    expect(guest.type).toBe(GuestType.SPECIAL);
  });
});
