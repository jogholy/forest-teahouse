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

  it('should add affection', () => {
    const guest = guestPool[0];
    const updated = engine.addAffection(guest, 20);
    expect(updated.affection).toBe(20);
  });

  it('should unlock chapters based on affection', () => {
    const guest = { ...guestPool[0], affection: 50 };
    const chapters = engine.unlockChapters(guest);
    const unlockedCount = chapters.filter(c => c.unlocked).length;
    expect(unlockedCount).toBeGreaterThan(1);
  });
});
