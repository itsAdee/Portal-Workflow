async function SelfServiceBillingPortal(workflowCtx, portal) {
    return {
      "Guide": {
        name: "Site Activity Tracking Guide",
        stepCallback: async () => {
          return workflowCtx.showContent(`## Introduction
  This is a guided walkthrough that will showcase capabilities of Self Service Billing Portal.
  ## Steps
  1. In step 1 we will read all the offers .
  2. In step 2 we will create a subscription.
  3. In step 3 we will enable billing portal for the customer.
  4. In step 4 we will resend billing portal invitation.
  5. In step 5 we will revoke billing portal invitation.
  6. In step 6 we will read billing portal invitation link.
  `);
        },
      },
      "Step 1": {
        name: "List Offers",
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
              description: "This endpoint is used to list all the offers",
              endpointPermalink: "$e/Offers/listOffers",
              args: {
              include_archived: true
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
      "Step 2": {
        name: "Create Subscription",
        stepCallback: async(stepState) => {
         const step2State = stepState?.["Step 1"];
          console.log(step2State?.data["offers"]?.[0]?.id);
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
            description: "This endpoint is used to create a subscription order.",
            endpointPermalink: "$e/Subscriptions/createSubscription",
            args: {
              body : {
                "subscription": {
                "offer_id": step2State?.data["offers"]?.[0]?.id,
                "customer_attributes": {
                  "first_name": "John",
                  "last_name": "Doe",
                  "email": "John@example.com"
                 
                },
                "credit_card_attributes": {
                  "last_name": "Smith",
                  "first_name": "Joe",
                  "full_number": "4111111111111111",
                  "expiration_year": "2021",
                  "expiration_month": "1",
                  "card_type": "visa",
                  "billing_zip": "02120",
                  "billing_state": "MA",
                  "billing_country": "US",
                  "billing_city": "Boston",
                  "billing_address_2": "billing_address_22",
                  "billing_address": "123 Mass Ave."
                }
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
        name: "Enable Billing Portal for Customer",
        stepCallback: async(stepState) => {
          const step3State = stepState?.["Step 2"];
          console.log(step3State?.data["subscription"]?.["customer"]?.id);
         
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
            description: "This endpoint is used to enable billing portal for the customer.",
            endpointPermalink: "$e/Billing%20Portal/enableBillingPortalForCustomer",
            args: {
            customer_id: step3State?.data["subscription"]?.["customer"]?.id
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
        name: "Resend Billing Portal Invitation",
        stepCallback: async(stepState) => {
          const step4State = stepState?.["Step 2"];
          console.log(step4State?.data["subscription"]?.["customer"]?.id);
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
            description: "This endpoint is used to resend billing portal invitation.",
            endpointPermalink: "$e/Billing%20Portal/resendBillingPortalInvitation",
           
            args: {
              customer_id: step4State?.data["subscription"]?.["customer"]?.id 
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
        name: "Revoke Billing Portal Invitation",
        stepCallback: async(stepState) => {
          const step5State = stepState?.["Step 2"];
          console.log(step5State?.data["subscription"]?.["customer"]?.id);
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
            description: "This endpoint is used to revoke billing portal access.",
            endpointPermalink: "$e/Billing%20Portal/revokeBillingPortalAccess",
            args: {
              customer_id: step5State?.data["subscription"]?.["customer"]?.id
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
        name: "Read Billing Portal Invitation Link",
        stepCallback: async(stepState) => {
          const step6State = stepState?.["Step 2"];
          console.log(step6State?.data["subscription"]?.["customer"]?.id);
        
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
            description: "This endpoint is used to read billing portal invitation link.",
            endpointPermalink: "$e/Billing%20Portal/readBillingPortalLink",
            args: {
              customer_id: step6State?.data["subscription"]?.["customer"]?.id
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
     
    }
  }