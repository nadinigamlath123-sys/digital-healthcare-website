/**
 * Digital Healthcare: Impact on Society - Chart.js Visualizations
 * High-definition, accessible medical charts with brand blue & green styling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Common Chart Colors
  const colors = {
    primaryBlue: '#1a56db',
    primaryBlueAlpha: 'rgba(26, 86, 219, 0.75)',
    primaryBlueSoft: 'rgba(26, 86, 219, 0.15)',
    accentCyan: '#0ea5e9',
    accentCyanAlpha: 'rgba(14, 165, 233, 0.75)',
    accentGreen: '#10b981',
    accentGreenAlpha: 'rgba(16, 185, 129, 0.75)',
    accentGreenSoft: 'rgba(16, 185, 129, 0.15)',
    accentAmber: '#f59e0b',
    neutralSlate: '#64748b',
    gridColor: '#e2e8f0',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
  };

  // ----------------------------------------------------
  // ACCESSIBILITY CHARTS
  // ----------------------------------------------------
  const waitTimeCtx = document.getElementById('accessibilityWaitTimesChart');
  if (waitTimeCtx && typeof Chart !== 'undefined') {
    new Chart(waitTimeCtx, {
      type: 'bar',
      data: {
        labels: ['Dermatology', 'Psychiatry', 'Primary Care', 'Cardiology', 'Endocrinology'],
        datasets: [
          {
            label: 'Traditional In-Person (Days to Consult)',
            data: [32.5, 28.0, 19.5, 26.2, 34.0],
            backgroundColor: 'rgba(100, 116, 139, 0.65)',
            borderColor: '#64748b',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Telemedicine / Virtual (Days to Consult)',
            data: [1.8, 1.2, 0.8, 2.4, 2.1],
            backgroundColor: colors.accentGreen,
            borderColor: colors.accentGreen,
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: colors.fontFamily, weight: '600' } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw} days wait`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Average Wait Time (Days)', font: { family: colors.fontFamily } },
            grid: { color: colors.gridColor }
          }
        }
      }
    });
  }

  const ruralTrendsCtx = document.getElementById('ruralAccessTrendsChart');
  if (ruralTrendsCtx && typeof Chart !== 'undefined') {
    new Chart(ruralTrendsCtx, {
      type: 'line',
      data: {
        labels: ['2019 (Pre-Pandemic)', '2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
        datasets: [
          {
            label: 'Rural Patient Telehealth Adoption (%)',
            data: [7.2, 48.5, 56.0, 61.4, 66.8, 71.2, 76.5],
            borderColor: colors.primaryBlue,
            backgroundColor: colors.primaryBlueSoft,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: colors.primaryBlue
          },
          {
            label: 'Underserved Urban Virtual Consultations (%)',
            data: [11.0, 52.3, 59.8, 64.1, 69.5, 74.0, 79.2],
            borderColor: colors.accentGreen,
            backgroundColor: colors.accentGreenSoft,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: colors.accentGreen
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: colors.fontFamily, weight: '600' } } }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { callback: (val) => val + '%' },
            title: { display: true, text: 'Adoption & Access Rate (%)', font: { family: colors.fontFamily } },
            grid: { color: colors.gridColor }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ----------------------------------------------------
  // ECONOMIC IMPACTS CHARTS
  // ----------------------------------------------------
  const savingsBreakdownCtx = document.getElementById('patientSavingsBreakdownChart');
  if (savingsBreakdownCtx && typeof Chart !== 'undefined') {
    new Chart(savingsBreakdownCtx, {
      type: 'doughnut',
      data: {
        labels: ['Avoided Lost Wages ($64)', 'Transit & Gas Savings ($36)', 'Parking & Facility Fees ($18)', 'Child/Elder Care Costs ($24)'],
        datasets: [
          {
            data: [64, 36, 18, 24],
            backgroundColor: [colors.primaryBlue, colors.accentCyan, colors.accentGreen, colors.accentAmber],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: colors.fontFamily, size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: $${ctx.raw} saved (Total: $142 avg/visit)`
            }
          }
        }
      }
    });
  }

  const hospitalCostCtx = document.getElementById('hospitalReadmissionCostChart');
  if (hospitalCostCtx && typeof Chart !== 'undefined') {
    new Chart(hospitalCostCtx, {
      type: 'bar',
      data: {
        labels: ['Congestive Heart Failure', 'Type 2 Diabetes Complications', 'Chronic COPD', 'Post-Op Follow-up'],
        datasets: [
          {
            label: 'Cost Without Telehealth ($ Millions)',
            data: [42.5, 36.2, 29.8, 22.4],
            backgroundColor: 'rgba(100, 116, 139, 0.6)',
            borderColor: '#64748b',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Cost With Tele-Monitoring ($ Millions)',
            data: [24.1, 19.8, 17.2, 11.5],
            backgroundColor: colors.primaryBlue,
            borderColor: colors.primaryBlue,
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: colors.fontFamily, weight: '600' } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: $${ctx.raw}M`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Expenditure ($ Millions)', font: { family: colors.fontFamily } },
            grid: { color: colors.gridColor }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ----------------------------------------------------
  // HEALTH OUTCOMES CHARTS
  // ----------------------------------------------------
  const chronicAdherenceCtx = document.getElementById('chronicAdherenceChart');
  if (chronicAdherenceCtx && typeof Chart !== 'undefined') {
    new Chart(chronicAdherenceCtx, {
      type: 'bar',
      data: {
        labels: ['Hypertension BP Control', 'HbA1c Diabetes Target', 'Asthma Control Index', 'Depression PHQ-9 Adherence'],
        datasets: [
          {
            label: 'Standard In-Person Routine Care (%)',
            data: [52.4, 48.1, 57.3, 44.0],
            backgroundColor: 'rgba(148, 163, 184, 0.65)',
            borderColor: '#94a3b8',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Telehealth + Remote Monitoring (%)',
            data: [78.6, 73.5, 84.2, 72.8],
            backgroundColor: colors.accentGreen,
            borderColor: colors.accentGreen,
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: colors.fontFamily, weight: '600' } } }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { callback: (val) => val + '%' },
            title: { display: true, text: 'Patient Success Rate (%)', font: { family: colors.fontFamily } },
            grid: { color: colors.gridColor }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  const readmissionReductionCtx = document.getElementById('readmissionReductionChart');
  if (readmissionReductionCtx && typeof Chart !== 'undefined') {
    new Chart(readmissionReductionCtx, {
      type: 'bar',
      data: {
        labels: ['Congestive Heart Failure', 'COPD', 'Stroke Rehabilitation', 'Post-Acute Surgery'],
        datasets: [
          {
            label: 'Readmission Reduction Rate (%)',
            data: [31.5, 27.8, 36.2, 42.0],
            backgroundColor: [colors.accentCyan, colors.accentGreen, colors.primaryBlue, '#8b5cf6'],
            borderRadius: 8
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw}% reduction in 30-day hospital readmissions`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 50,
            ticks: { callback: (val) => val + '%' },
            title: { display: true, text: '% Reduction in 30-Day Hospital Readmission' },
            grid: { color: colors.gridColor }
          },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // ----------------------------------------------------
  // SUMMARY RADAR CHART
  // ----------------------------------------------------
  const summaryRadarCtx = document.getElementById('summaryRadarChart');
  if (summaryRadarCtx && typeof Chart !== 'undefined') {
    new Chart(summaryRadarCtx, {
      type: 'radar',
      data: {
        labels: [
          'Care Accessibility & Reach',
          'Economic Cost Savings',
          'Clinical Outcome Adherence',
          'Diagnostic Velocity',
          'Patient Satisfaction & Equity',
          'Continuity of Care'
        ],
        datasets: [
          {
            label: 'Modern Telemedicine Era',
            data: [92, 88, 86, 94, 90, 89],
            backgroundColor: 'rgba(16, 185, 129, 0.25)',
            borderColor: colors.accentGreen,
            borderWidth: 2.5,
            pointBackgroundColor: colors.accentGreen,
            pointRadius: 4
          },
          {
            label: 'Traditional In-Person Only Baseline',
            data: [54, 42, 58, 48, 62, 56],
            backgroundColor: 'rgba(26, 86, 219, 0.15)',
            borderColor: colors.primaryBlue,
            borderWidth: 2,
            pointBackgroundColor: colors.primaryBlue,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: colors.fontFamily, weight: '600' } } }
        },
        scales: {
          r: {
            suggestedMin: 30,
            suggestedMax: 100,
            ticks: { stepSize: 20, backdropColor: 'transparent' },
            grid: { color: colors.gridColor },
            pointLabels: { font: { family: colors.fontFamily, size: 12, weight: '600' }, color: '#1e293b' }
          }
        }
      }
    });
  }
});
