// utils/usePermissions.ts
import { useCallback } from 'react';
import { errorToast, successToast } from 'utils';



export type PermissionType =
  | 'Location'
  | 'Camera'
  | 'Microphone'
  | 'Notifications';

export const usePermissions = () => {
  const requestPermission = useCallback(async (type: PermissionType) => {
    switch (type) {
      case 'Location': {
        if (!navigator.geolocation) {
          errorToast('Geolocation is not supported in this browser.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          () => successToast('Location access granted.'),
          (error) => errorToast(`Location error: ${error.message}`)
        );
        break;
      }

      case 'Camera':
      case 'Microphone': {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: type === 'Camera',
            audio: type === 'Microphone',
          });
          successToast(`${type} access granted.`);
          stream.getTracks().forEach((track) => track.stop());
        } catch (error: any) {
          errorToast(`${type} access denied.`);
        }
        break;
      }

      case 'Notifications': {
        if (!('Notification' in window)) {
          errorToast('Notifications are not supported by your browser.');
          return;
        }
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          successToast('Notifications access granted.');
        } else {
          errorToast('Notifications access denied.');
        }
        break;
      }

      default:
        errorToast('Permission type not recognized.');
    }
  }, []);

  return { requestPermission };
};
