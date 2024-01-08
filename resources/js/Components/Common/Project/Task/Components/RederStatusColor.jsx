import React from 'react';

 export const RenderStatusColor = (status) => {
    switch (status) {
      case 'new':
        return "#1976d2";

      case 'started':
        return "#00bcd4";

      case 'complete':
        return "#2e7d32";

      case 'pause':
        return "#757575";

      case 'reviewed':
        return "#29b6f6";

      case 'debugging':
        return "#8c9eff";

      default:
        return "#000000";
    }
  }



