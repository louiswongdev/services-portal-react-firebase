import { FETCH_RESOURCE_SUCCESS, REQUEST_RESOURCE } from '../types';

export const isFetching = resourceType => {
  return (state = false, action) => {
    if (resourceType !== action.resourceType) {
      return state;
    }

    switch (action.type) {
      case REQUEST_RESOURCE:
        return true;
      case FETCH_RESOURCE_SUCCESS:
        return false;
      default:
        return state;
    }
  };
};
