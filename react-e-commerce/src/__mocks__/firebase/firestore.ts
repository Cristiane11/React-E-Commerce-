export const getFirestore = () => ({});
export const doc = jest.fn();
export const setDoc = jest.fn();
export const getDoc = jest.fn(() => Promise.resolve({ exists: () => false }));
export const updateDoc = jest.fn();
export const deleteDoc = jest.fn();