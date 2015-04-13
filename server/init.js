createServiceConfiguration = function(service, clientId, secret) {
  var config;
  ServiceConfiguration.configurations.remove({
    service: service
  });
  config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};

createServiceConfiguration('facebook', '911652492188133', '750096896f38d484e7db203012a818c7')
createServiceConfiguration('twitter', 'nfE4V1rpKRTzWdqruu2IBLB2R', 'vedbY8Udx5h65RELblXTJlosI6z27dg4VFVNHIFdOFvHz2C2MX')
createServiceConfiguration('google', '410884025676-kf5kf6ns6kn61vcms109pv5acg3unbvf.apps.googleusercontent.com', 'gMqoFhmeSRqvPiiE9OdNrrMS')

  Meteor.startup(function () {
    Avatar.options = {
      defaultImageUrl: "/default-avatar.png"
    };
  });