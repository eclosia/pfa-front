import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Rating,
  FormControl,
  InputLabel,
  CardHeader,
  Stack,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  offerTitle: string;
  cv: string;
  motivation: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: Date;
  interviewDate?: Date;
  notes?: string;
  technicalScore?: number;
  softSkillsScore?: number;
  overallScore?: number;
}

const CompanyApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Partial<Application>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveApplication = () => {
    if (currentApplication.id) {
      setApplications(applications.map(app =>
        app.id === currentApplication.id ? { ...app, ...currentApplication } : app
      ));
    } else {
      setApplications([...applications, { ...currentApplication, id: Date.now().toString() } as Application]);
    }
    setOpenDialog(false);
  };

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const filteredApplications = applications.filter(app =>
    app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.offerTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Candidatures
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: 220, bgcolor: 'background.paper', borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <IconButton size="small" sx={{ color: 'text.secondary', mr: 1 }}>
                  <span className="material-icons">search</span>
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ fontWeight: 600 }}
          >
            Nouvelle candidature
          </Button>
        </Box>
      </Box>

      <Stack spacing={3}>
        {filteredApplications.map((application) => (
          <Card key={application.id} sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardHeader
              sx={{
                bgcolor: application.status === 'accepted' ? 'success.light' : application.status === 'rejected' ? 'error.light' : 'primary.light',
                color: application.status === 'accepted' ? 'success.contrastText' : application.status === 'rejected' ? 'error.contrastText' : 'primary.contrastText',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                pb: 1,
              }}
              title={<Typography variant="h6" fontWeight={700}>{application.studentName}</Typography>}
              subheader={<Typography variant="subtitle2">{application.offerTitle}</Typography>}
              action={
                <Chip
                  label={application.status === 'accepted' ? 'ACCEPTÉE' : application.status === 'rejected' ? 'REJETÉE' : 'EN ATTENTE'}
                  color={application.status === 'accepted' ? 'success' : application.status === 'rejected' ? 'error' : 'warning'}
                  sx={{ fontWeight: 700 }}
                />
              }
            />
            <Divider />
            <CardContent>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start" justifyContent="space-between">
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Tooltip title="Email">
                      <IconButton size="small" disabled>
                        <span className="material-icons">mail</span>
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2">{application.studentEmail}</Typography>
                    <Tooltip title="Téléphone">
                      <IconButton size="small" disabled>
                        <span className="material-icons">call</span>
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2">{application.studentPhone}</Typography>
                    <Tooltip title="Date de candidature">
                      <IconButton size="small" disabled>
                        <span className="material-icons">event</span>
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2">{new Date(application.appliedDate).toLocaleDateString()}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {application.motivation}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="Voir les détails">
                    <IconButton color="primary">
                      <span className="material-icons">visibility</span>
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleStatusChange(application.id, 'accepted')}
                    disabled={application.status === 'accepted'}
                    sx={{ fontWeight: 600 }}
                  >
                    ACCEPTER
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => handleStatusChange(application.id, 'rejected')}
                    disabled={application.status === 'rejected'}
                    sx={{ fontWeight: 600 }}
                  >
                    REJETER
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentApplication.id ? "Modifier la candidature" : "Nouvelle candidature"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Nom du candidat"
                  value={currentApplication.studentName || ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, studentName: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Email"
                  value={currentApplication.studentEmail || ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, studentEmail: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={currentApplication.studentPhone || ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, studentPhone: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Titre du poste"
                  value={currentApplication.offerTitle || ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, offerTitle: e.target.value })}
                />
              </Box>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Lettre de motivation"
              value={currentApplication.motivation || ''}
              onChange={(e) => setCurrentApplication({ ...currentApplication, motivation: e.target.value })}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={currentApplication.notes || ''}
              onChange={(e) => setCurrentApplication({ ...currentApplication, notes: e.target.value })}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Date de candidature"
                  value={currentApplication.appliedDate ? new Date(currentApplication.appliedDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, appliedDate: new Date(e.target.value) })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Date d'entretien"
                  value={currentApplication.interviewDate ? new Date(currentApplication.interviewDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentApplication({ ...currentApplication, interviewDate: new Date(e.target.value) })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Score technique</InputLabel>
                  <Select
                    value={currentApplication.technicalScore || 0}
                    label="Score technique"
                    onChange={(e) => setCurrentApplication({ ...currentApplication, technicalScore: e.target.value as number })}
                  >
                    {[0, 1, 2, 3, 4, 5].map((score) => (
                      <MenuItem key={score} value={score}>
                        {score}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Soft skills</InputLabel>
                  <Select
                    value={currentApplication.softSkillsScore || 0}
                    label="Soft skills"
                    onChange={(e) => setCurrentApplication({ ...currentApplication, softSkillsScore: e.target.value as number })}
                  >
                    {[0, 1, 2, 3, 4, 5].map((score) => (
                      <MenuItem key={score} value={score}>
                        {score}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Score global</InputLabel>
                  <Select
                    value={currentApplication.overallScore || 0}
                    label="Score global"
                    onChange={(e) => setCurrentApplication({ ...currentApplication, overallScore: e.target.value as number })}
                  >
                    {[0, 1, 2, 3, 4, 5].map((score) => (
                      <MenuItem key={score} value={score}>
                        {score}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Annuler
          </Button>
          <Button onClick={handleSaveApplication} variant="contained" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyApplications; 