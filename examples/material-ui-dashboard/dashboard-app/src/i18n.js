// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {

        
        translation: {
            "weeklyUpdates": "Weekly updates",
            "deliveryTrends": "Delivery trends",
            "deliveryByClient": "Delivery by client",
            "deliveryByCarer": "Delivery by carer",
            "managementTrends": "Management trends",
            "managementByClient": "Management by client",
            "monitoringAndAuditing": "Monitoring & auditing",
            "qScoreSummary": "Q-Score summary",
            "activeClientTrends": "Active client trends",
            "actions": "Actions",
            "setupAndTraining": "Setup and training",
            "clientProfiles": "Client profiles",
            "dateRange": "Date Range",
            "last7Days": "Last 7 days",
            "last13Weeks": "Last 13 weeks",
            "last12Months": "Last 12 months",
            "clientName": "Client Name",
            "carerName": "Caregiver Name",
            "allClients": "All clients",
            "allCarers": "All caregivers",
            "visitsAndHoursDelivered": "Visits & hours delivered",
            "reportedVisits": "Reported visits",
            "percentageOfScheduledVisitsWithReport": "Percentage of scheduled visits with report",
            "hoursDelivered": "Hours delivered",
            "percentageOfScheduledHoursDelivered": "Percentage of scheduled hours delivered",
            "punctuality": "Punctuality",
            "percentageOfVisitsStartingWithin15Mins": "Percentage of visits starting within 15 mins",
            "careTasksAndObservations": "Care tasks & observations",
            "medications": "Medications",
            "branchName": "(Demo) Enterprise Demo Hub",    
        }
      },
      de: {
        translation: {
            "weeklyUpdates": "Wöchentliche Updates",
            "deliveryTrends": "Lieferungstrends",
            "deliveryByClient": "Lieferung nach Klient",
            "deliveryByCarer": "Lieferung nach Pflegekraft",
            "managementTrends": "Managementtrends",
            "managementByClient": "Management nach Klient",
            "monitoringAndAuditing": "Überwachung und Prüfung",
            "qScoreSummary": "Q-Score Zusammenfassung",
            "activeClientTrends": "Aktive Kliententrends",
            "actions": "Aktionen",
            "setupAndTraining": "Einrichtung und Schulung",
            "clientProfiles": "Klientenprofile",
            "dateRange": "Zeitraum",
            "last7Days": "Letzten 7 Tage",
            "last13Weeks": "Letzten 13 Wochen",
            "last12Months": "Letzten 12 Monate",
            "clientName": "Klientenname",
            "carerName": "Pflegekraftname",
            "allClients": "Alle Klienten",
            "allCarers": "Alle Pflegekräfte",
            "visitsAndHoursDelivered": "Besuche & geleistete Stunden",
            "reportedVisits": "Gemeldete Besuche",
            "percentageOfScheduledVisitsWithReport": "Prozentsatz der geplanten Besuche mit Bericht",
            "hoursDelivered": "Geleistete Stunden",
            "percentageOfScheduledHoursDelivered": "Prozentsatz der geplanten Stunden",
            "punctuality": "Pünktlichkeit",
            "percentageOfVisitsStartingWithin15Mins": "Prozentsatz der Besuche, die innerhalb von 15 Minuten beginnen",
            "careTasksAndObservations": "Pflegeaufgaben und Beobachtungen",
            "medications": "Medikamente",
            "branchName": "Unternehmens-Demohub"
          }
      }
      // Add more languages here
    },
    lng: "en", // If the language specifier is not available, fallback to English.
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
