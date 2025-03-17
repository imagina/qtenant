import baseService from 'modules/qcrud/_services/baseService';

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
          resolve(
            Object.entries(response.data)
              .filter(([_, module]) => module?.client)
              .map(([moduleName, module]) => ({
                name: moduleName.toLowerCase(),
                ...module,
              }))
          );
        })
        .catch((error) => {
          console.error(error)
          reject([])
        });
    });
  },
};
