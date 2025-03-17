import baseService from 'modules/qcrud/_services/baseService';
import axios from 'axios';

export default {
  getModulesTenantConfig(refresh = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestParams = {
        refresh,
        params: {
          filter: {
            allTranslations: true,
            configNameByModule: 'config.tenant',
          },
        },
      };
      //Request
      baseService
        .index('apiRoutes.qsite.configs', requestParams)
        .then((response) => {
          let client = Object.entries(response.data)
            .filter(([_, module]) => module?.client)
            .map(([moduleName, module]) => ({
              name: moduleName.toLowerCase(),
              ...module,
            }));
          let baseTenantUrl = response.data.Itenant.baseTenantUrl;
          resolve({ client, baseTenantUrl });
        })
        .catch((error) => {
          console.error(error);
          reject({ client: [], baseTenantUrl: null });
        });
    });
  },
  getLayouts(baseTenantUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = {
        filter: { entityType: 'Modules\\Page\\Entities\\Page', type: 'home' },
        include: 'files'
      };
      //Request
      axios
        .get(`${baseTenantUrl}/api${config('apiRoutes.qbuilder.layouts')}`, {
          params,
        })
        .then((response) => {
          resolve(response.data.data)
        }).catch(error => resolve([]));
    });
  },
};
