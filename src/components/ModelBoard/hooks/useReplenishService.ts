import { useServiceCheck } from 'do-ents/useServiceCheck';
import { useSelectedService } from './../../../hooks/useSelectedService';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { servicesState } from './../../../recoil/atoms';

export function useReplenishService() {
  const selectedService = useSelectedService()
  const setServices = useSetRecoilState(servicesState)
  const [check] = useServiceCheck((service) => {
    if (service && selectedService) {
      setServices(services => {
        const svcs = [
          ...services.filter(svc => svc.url !== selectedService?.url),
          { ...selectedService, canUpload: service.canUpload }
        ]
        return svcs
      })
    }
  })

  useEffect(() => {
    if (selectedService?.id) {
      check(selectedService.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService?.id])
}