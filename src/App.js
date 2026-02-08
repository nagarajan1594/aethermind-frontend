import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio, Card, Chip, Alert,
  CircularProgress, Grid, Divider, Paper, Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const API_URL = 'https://YOUR-RAILWAY-URL/api';

// INDUSTRY-SPECIFIC USE CASES (5+ per industry)
const INDUSTRY_USE_CASES = {
  financial_services: [
    { value: 'credit_scoring', label: 'Credit Scoring & Loan Approval' },
    { value: 'loan_underwriting', label: 'Automated Loan Underwriting' },
    { value: 'fraud_detection', label: 'Fraud Detection & Prevention' },
    { value: 'investment_recommendation', label: 'Investment Recommendations' },
    { value: 'customer_risk_profiling', label: 'Customer Risk Profiling' },
    { value: 'algorithmic_trading', label: 'Algorithmic Trading' }
  ],
  healthcare: [
    { value: 'medical_diagnosis', label: 'AI-Assisted Medical Diagnosis' },
    { value: 'treatment_recommendation', label: 'Treatment Recommendation Systems' },
    { value: 'patient_risk_stratification', label: 'Patient Risk Stratification' },
    { value: 'medical_imaging', label: 'Medical Imaging Analysis' },
    { value: 'drug_discovery', label: 'Drug Discovery & Development' },
    { value: 'predictive_health_analytics', label: 'Predictive Health Analytics' }
  ],
  retail_ecommerce: [
    { value: 'recommendation_engine', label: 'Product Recommendation Engine' },
    { value: 'dynamic_pricing', label: 'Dynamic Pricing Algorithms' },
    { value: 'personalized_marketing', label: 'Personalized Marketing & Ads' },
    { value: 'inventory_prediction', label: 'Inventory & Demand Prediction' },
    { value: 'customer_segmentation', label: 'Customer Segmentation' },
    { value: 'chatbot_support', label: 'AI Customer Service Chatbots' }
  ],
  technology: [
    { value: 'content_moderation', label: 'Content Moderation Systems' },
    { value: 'search_ranking', label: 'Search & Ranking Algorithms' },
    { value: 'recommendation_systems', label: 'Content Recommendation' },
    { value: 'user_profiling', label: 'User Profiling & Targeting' },
    { value: 'sentiment_analysis', label: 'Sentiment Analysis' },
    { value: 'code_generation', label: 'AI Code Generation Tools' }
  ],
  human_resources: [
    { value: 'hiring', label: 'Resume Screening & Hiring' },
    { value: 'employee_performance', label: 'Employee Performance Evaluation' },
    { value: 'workforce_planning', label: 'Workforce Planning & Analytics' },
    { value: 'talent_matching', label: 'Talent Matching Systems' },
    { value: 'training_recommendation', label: 'Training & Development Recommendations' }
  ],
  education: [
    { value: 'student_assessment', label: 'Automated Student Assessment' },
    { value: 'admission_decisions', label: 'Admissions Decision Systems' },
    { value: 'personalized_learning', label: 'Personalized Learning Paths' },
    { value: 'proctoring', label: 'AI Proctoring Systems' },
    { value: 'scholarship_allocation', label: 'Scholarship & Aid Allocation' }
  ]
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [industry, setIndustry] = useState('');
  const [useCase, setUseCase] = useState('');
  const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
  const [dataVolume, setDataVolume] = useState('');
  const [selectedDataTypes, setSelectedDataTypes] = useState([]);
  const [decisionImpact, setDecisionImpact] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const jurisdictions = ['European Union', 'India', 'California', 'Canada'];
  const dataTypes = ['Personal Data', 'Financial Data', 'Health Data', 'Biometric Data', 'Behavioral Data', 'Location Data'];

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#8b5cf6' },
      background: {
        default: darkMode ? '#0a0a0f' : '#f8fafc',
        paper: darkMode ? '#1a1a2e' : '#ffffff'
      }
    },
    typography: { fontFamily: 'Inter, sans-serif' }
  });

  const analyzeRisk = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useCase,
          jurisdictions: selectedJurisdictions,
          dataTypes: selectedDataTypes,
          decisionImpact,
          industry,
          dataVolume
        })
      });
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResults(data);
      // Scroll to results
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    setError(null);
    setIndustry('');
    setUseCase('');
    setSelectedJurisdictions([]);
    setDataVolume('');
    setSelectedDataTypes([]);
    setDecisionImpact('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        py: 4
      }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h2" sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              AetherMind
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
              AI Risk Analysis for C-Suite Leaders
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive regulatory intelligence to guide responsible AI implementation
            </Typography>
          </Box>

          {/* Assessment Form */}
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>AI System Assessment</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Complete all fields to receive a comprehensive risk analysis and implementation roadmap
            </Typography>

            <Stack spacing={4}>
              {/* Industry */}
              <Box>
                <Chip label="STEP 1" size="small" color="primary" sx={{ mb: 1 }} />
                <FormControl fullWidth required>
                  <InputLabel>Industry Sector</InputLabel>
                  <Select value={industry} onChange={(e) => { setIndustry(e.target.value); setUseCase(''); }}>
                    <MenuItem value="financial_services">Financial Services</MenuItem>
                    <MenuItem value="healthcare">Healthcare & Life Sciences</MenuItem>
                    <MenuItem value="retail_ecommerce">Retail & E-Commerce</MenuItem>
                    <MenuItem value="technology">Technology & Software</MenuItem>
                    <MenuItem value="human_resources">Human Resources</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Use Case */}
              <Box>
                <Chip label="STEP 2" size="small" color="primary" sx={{ mb: 1 }} />
                <FormControl fullWidth required disabled={!industry}>
                  <InputLabel>AI Use Case</InputLabel>
                  <Select value={useCase} onChange={(e) => setUseCase(e.target.value)}>
                    {(INDUSTRY_USE_CASES[industry] || []).map(uc => (
                      <MenuItem key={uc.value} value={uc.value}>{uc.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Jurisdictions */}
              <Box>
                <Chip label="STEP 3" size="small" color="primary" sx={{ mb: 1 }} />
                <FormLabel>Operating Jurisdictions *</FormLabel>
                <Grid container>
                  {jurisdictions.map(j => (
                    <Grid item xs={6} md={3} key={j}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedJurisdictions.includes(j)} onChange={(e) => {
                          if (e.target.checked) setSelectedJurisdictions([...selectedJurisdictions, j]);
                          else setSelectedJurisdictions(selectedJurisdictions.filter(x => x !== j));
                        }} />}
                        label={j}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Data Volume */}
              <Box>
                <Chip label="STEP 4" size="small" color="primary" sx={{ mb: 1 }} />
                <FormControl fullWidth required>
                  <InputLabel>Data Volume</InputLabel>
                  <Select value={dataVolume} onChange={(e) => setDataVolume(e.target.value)}>
                    <MenuItem value="micro">Micro (&lt;1,000 records)</MenuItem>
                    <MenuItem value="small">Small (1K-50K records)</MenuItem>
                    <MenuItem value="medium">Medium (50K-500K records)</MenuItem>
                    <MenuItem value="large">Large (500K-5M records)</MenuItem>
                    <MenuItem value="very_large">Very Large (&gt;5M records)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Data Types */}
              <Box>
                <Chip label="STEP 5" size="small" color="primary" sx={{ mb: 1 }} />
                <FormLabel>Data Types Processed *</FormLabel>
                <Grid container>
                  {dataTypes.map(dt => (
                    <Grid item xs={12} sm={6} md={4} key={dt}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedDataTypes.includes(dt)} onChange={(e) => {
                          if (e.target.checked) setSelectedDataTypes([...selectedDataTypes, dt]);
                          else setSelectedDataTypes(selectedDataTypes.filter(x => x !== dt));
                        }} />}
                        label={dt}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Decision Impact */}
              <Box>
                <Chip label="STEP 6" size="small" color="primary" sx={{ mb: 1 }} />
                <FormLabel>Decision Impact Level *</FormLabel>
                <RadioGroup value={decisionImpact} onChange={(e) => setDecisionImpact(e.target.value)}>
                  <FormControlLabel value="minimal" control={<Radio />} label="Minimal - Informational, no significant impact" />
                  <FormControlLabel value="moderate" control={<Radio />} label="Moderate - Influences but doesn't determine outcomes" />
                  <FormControlLabel value="major_economic" control={<Radio />} label="Major Economic - Significantly affects financial decisions" />
                  <FormControlLabel value="life_altering" control={<Radio />} label="Life-Altering - Affects health, freedom, or fundamental rights" />
                </RadioGroup>
              </Box>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={analyzeRisk}
              disabled={!useCase || selectedJurisdictions.length === 0 || selectedDataTypes.length === 0 || !decisionImpact || !industry || !dataVolume || loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 2,
                fontSize: '1.1rem'
              }}
            >
              {loading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : '🎯 Generate Executive Risk Report'}
            </Button>
          </Card>

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          {/* RESULTS */}
          {results && (
            <>
              {/* Risk Score Card */}
              <Card sx={{ p: 4, mb: 4, border: '2px solid', borderColor: results.riskLevel === 'Critical' ? 'error.main' : results.riskLevel === 'High' ? 'warning.main' : 'success.main' }}>
                <Typography variant="h4" gutterBottom>Executive Risk Assessment</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Chip
                    label={`${results.riskScore}/100`}
                    color={results.riskScore >= 80 ? 'error' : results.riskScore >= 60 ? 'warning' : 'success'}
                    sx={{ fontSize: '2rem', py: 4, px: 3 }}
                  />
                  <Box>
                    <Typography variant="h5">{results.riskLevel} Risk</Typography>
                    <Typography variant="body2" color="text.secondary">{results.summary}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Risk Score Breakdown (Weighted Analysis)</Typography>
                <Grid container spacing={2}>
                  {Object.entries(results.riskBreakdown).map(([key, data]) => {
                    if (key === 'regulatoryComplexity') {
                      return (
                        <Grid item xs={12} key={key}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight={700}>Regulatory Complexity (30% weight)</Typography>
                              <Typography variant="subtitle2" color="primary">{data.score}/30 points</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{data.explanation}</Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    if (key === 'decisionImpactScore') {
                      return (
                        <Grid item xs={12} key={key}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight={700}>Decision Impact (25% weight)</Typography>
                              <Typography variant="subtitle2" color="primary">{data.score}/25 points</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{data.explanation}</Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    if (key === 'dataVolumeScore') {
                      return (
                        <Grid item xs={12} key={key}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight={700}>Data Volume (20% weight)</Typography>
                              <Typography variant="subtitle2" color="primary">{data.score}/20 points</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{data.explanation}</Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    if (key === 'dataSensitivityScore') {
                      return (
                        <Grid item xs={12} key={key}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight={700}>Data Sensitivity (15% weight)</Typography>
                              <Typography variant="subtitle2" color="primary">{data.score}/15 points</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{data.explanation}</Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    if (key === 'jurisdictionalScore') {
                      return (
                        <Grid item xs={12} key={key}>
                          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight={700}>Jurisdictional Complexity (10% weight)</Typography>
                              <Typography variant="subtitle2" color="primary">{data.score}/10 points</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{data.explanation}</Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Card>

              {/* Regulations */}
              <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Applicable Regulations ({results.matchingRegulations?.length || 0})</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Detailed analysis of regulatory requirements across selected jurisdictions
                </Typography>

                {results.matchingRegulations && results.matchingRegulations.length > 0 ? (
                  results.matchingRegulations.map((reg, idx) => (
                    <Accordion key={idx} sx={{ mb: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>{reg.name}</Typography>
                          <Chip label={reg.jurisdiction} size="small" color="primary" />
                          <Chip label={reg.category === 'ai_specific' ? 'AI-Specific' : 'Privacy'} size="small" variant="outlined" />
                          <Chip label={reg.riskLevel} size="small" color={reg.riskLevel === 'high' ? 'error' : 'warning'} />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 2 }}>
                          {/* Executive Summary */}
                          <Typography variant="h6" gutterBottom>Executive Summary</Typography>
                          <Typography variant="body2" paragraph>{reg.executiveSummary}</Typography>

                          {/* Penalties */}
                          <Divider sx={{ my: 3 }} />
                          <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.dark', color: 'white' }}>
                            <Typography variant="h6" gutterBottom>⚠️ Penalties for Non-Compliance</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Maximum Penalty:</strong> {reg.penalties.maximum}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Enforcement Authority:</strong> {reg.penalties.authority}
                            </Typography>
                            {reg.penalties.notes && (
                              <Typography variant="body2">
                                <strong>Additional Notes:</strong> {reg.penalties.notes}
                              </Typography>
                            )}
                          </Paper>

                          {/* Key Requirements */}
                          <Typography variant="h6" gutterBottom>Key Compliance Requirements</Typography>
                          <List dense>
                            {reg.keyRequirements?.map((req, i) => (
                              <ListItem key={i} sx={{ pl: 0, alignItems: 'flex-start' }}>
                                <ListItemText
                                  primary={`${i + 1}. ${req}`}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <Typography color="text.secondary">No regulations matched your selection</Typography>
                )}
              </Card>

              {/* Implementation Roadmap */}
              <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Implementation Roadmap</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Prioritized action plan for compliance and ethical AI deployment
                </Typography>

                {results.recommendations && results.recommendations.length > 0 ? (
                  results.recommendations.map((rec, idx) => (
                    <Paper key={idx} sx={{
                      p: 3,
                      mb: 3,
                      border: '2px solid',
                      borderColor: rec.priority === 'CRITICAL' ? 'error.main' : rec.priority === 'HIGH' ? 'warning.main' : 'info.main'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Chip
                          label={rec.priority}
                          color={rec.priority === 'CRITICAL' ? 'error' : rec.priority === 'HIGH' ? 'warning' : 'info'}
                          sx={{ fontWeight: 700 }}
                        />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>{rec.title}</Typography>
                      </Box>

                      <Typography variant="body2" paragraph><strong>Rationale:</strong> {rec.rationale}</Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2"><strong>Timeline:</strong> {rec.timeline}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2"><strong>Estimated Cost:</strong> {rec.estimatedCost}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2"><strong>Owner:</strong> {rec.responsibleParty}</Typography>
                        </Grid>
                      </Grid>

                      <Typography variant="subtitle2" gutterBottom>Key Steps:</Typography>
                      <List dense>
                        {rec.keySteps.map((step, i) => (
                          <ListItem key={i} sx={{ pl: 2 }}>
                            <ListItemText primary={`${i + 1}. ${step}`} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))}
                      </List>

                      <Paper sx={{ p: 2, mt: 2, bgcolor: 'background.default' }}>
                        <Typography variant="body2"><strong>Business Impact:</strong> {rec.businessImpact}</Typography>
                      </Paper>
                    </Paper>
                  ))
                ) : (
                  <Typography color="text.secondary">No recommendations generated</Typography>
                )}
              </Card>

              {/* Disclaimer */}
              <Paper sx={{ p: 3, bgcolor: 'warning.dark', color: 'white' }}>
                <Typography variant="h6" gutterBottom>⚠️ Important Disclaimer</Typography>
                <Typography variant="body2" paragraph>
                  This analysis is provided for informational purposes only and does not constitute legal advice. Regulations evolve rapidly, and enforcement varies by jurisdiction.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>We strongly recommend:</strong>
                </Typography>
                <List dense>
                  <ListItem sx={{ color: 'white' }}>
                    <ListItemText primary="• Consult with qualified legal counsel specializing in AI and data protection law" />
                  </ListItem>
                  <ListItem sx={{ color: 'white' }}>
                    <ListItemText primary="• Conduct secondary research on recent regulatory updates and enforcement actions" />
                  </ListItem>
                  <ListItem sx={{ color: 'white' }}>
                    <ListItemText primary="• Engage with your risk management and compliance teams before implementation" />
                  </ListItem>
                  <ListItem sx={{ color: 'white' }}>
                    <ListItemText primary="• Consider engaging external auditors for independent compliance assessment" />
                  </ListItem>
                </List>
              </Paper>

              {/* Reset Button */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="outlined" size="large" onClick={resetForm}>
                  Start New Analysis
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
