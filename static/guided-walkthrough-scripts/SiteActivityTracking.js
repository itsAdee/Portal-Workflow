async function SiteActivityTracking(workflowCtx, portal) {
    return {
      "Guide": {
        name: "Site Activity Tracking Guide",
        stepCallback: async () => {
          return workflowCtx.showContent(`## Introduction
  This is a guided walkthrough that will showcase site activity tracking in maxio using 6 steps.
  ## Steps
  1. In step 1 we will enable webhook .
  2. In step 2 we will create a webhook endpoint.
  3. In step 3 we will create a customer.
  4. In step 4 we will update the create customer.
  5. In step 5 we will add add metadata for the created customer.
  6. In step 6 we will all the events.
  7. In step 7 we will list all the customers. 
  `);
        },
      },
      "Step 1": {
        name: "Enable Webhooks",
        stepCallback: async (stepState) => {
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to enable the webhooks.",
            endpointPermalink: "$e/Webhooks/enableWebhooks",
            args: {
  
              body: {
                "webhooks_enabled": true
              }
             
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        },
      },
      "Step 2": {
        name: "Create Webhook Endpoint",
        stepCallback: async(stepState) => {
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to create a webhook endpoint.",
            endpointPermalink: "$e/Webhooks/createEndpoint",
            args: {
              body: {
                "endpoint": {
                  "url": "https://your.site/webhooks",
                  "webhook_subscriptions": [
                    "payment_success",
                    "payment_failure"
                  ]
                }
              }
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
        
      },
      "Step 3": {
        name: "Create Customer",
        stepCallback: async(stepState) => {
         
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to create a customer.",
            endpointPermalink: "$e/Customers/createCustomer",
            args: {
             body : {
            
              "customer": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john@example.com"
              }
             
             }
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200 || response.StatusCode == 201) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
      },
      "Step 4": {
        name: "Update Customer",
        stepCallback: async(stepState) => {
          const step4State = stepState?.["Step 3"];
          console.log(step4State?.data["customer"]?.id);
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to update a customer",
            endpointPermalink: "$e/Customers/updateCustomer",
           
            args: {
             id : step4State?.data["customer"]?.id, 
             
             body : {
             
              "customer": { 
                "first_name": "John222",
                "last_name": "Doe",
                "email": "John2@exampple.com"
              }
            }
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
      },
      "Step 5": {
        name: "Create Metadata for Customer",
        stepCallback: async(stepState) => {
          const step5State = stepState?.["Step 3"];
          console.log(step5State?.data["customer"]?.id);
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to create metadata ",
            endpointPermalink: "$e/Custom%20Fields/createMetadata",
            args: {
              resource_type: "customers",
              resource_id: step5State?.data["customer"]?.id,
  
             body : {
              "metadata": [
                {
                  "name": "Color",
                  "value": "Blue"
                },
                {
                  "name": "Something",
                  "value": "Useful"
                }
              ]
            }
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
      },
      "Step 6": {
        name: "List Events",
        stepCallback: async(stepState) => {
        
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to list all the events",
            endpointPermalink: "$e/Events/listEvents",
            args: {
              filter:"signup_success,payment_success"
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
      },
      
      "Step 7": {
        name: "List Customers",
        // TODO: Check how to use q
        stepCallback: async(stepState) => {
          const step7State = stepState?.["Step 3"];
          console.log(step7State?.data["customer"]?.id);
          await portal.setConfig((defaultConfig) => ({
            ...defaultConfig,
            showFullCode: true,
            auth:{
              ...defaultConfig.auth,
              "BasicAuth": {
                "BasicAuthUserName": "Fdgh1XFV8awCP8ds1Pq5Y0ylx5E2QleILN7BQ8PBto",
                "BasicAuthPassword": "x"
            }
            },
            config: {
              ...defaultConfig.config,
              "subdomain": "globo-billing",
            }
          }));
          return workflowCtx.showEndpoint({
            description: "This endpoint is used to list all the customers.",
            endpointPermalink: "$e/Customers/listCustomers",
            args: {
              q: step7State?.data["customer"]?.id
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200) {
                return true;
              }
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            
            },
          });
        }
        
      }
     
    }
  }