import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import { ArrowBack, CheckCircle, Cancel, Download, Mail, Phone, Event, InsertDriveFile } from '@mui/icons-material';


const mockApplications = [
  {
    id: '1',
    studentName: 'Yassine El Alami',
    studentEmail: 'yassine.alami@example.com',
    studentPhone: '+212 6 12 34 56 78',
    offerTitle: 'Développeur Full Stack',
    cv: 'cv-yassine.pdf',
    motivation: "Développeur passionné avec 5 ans d'expérience en React et Node.js, je souhaite rejoindre votre équipe pour contribuer à des projets innovants.",
    status: 'pending',
    appliedDate: '2023-05-15',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    studentName: 'Sophie Benelli',
    studentEmail: 'sophie.benelli@example.com',
    studentPhone: '+212 6 98 76 54 32',
    offerTitle: 'Data Analyst',
    cv: 'cv-sophie.pdf',
    motivation: "Analyste en analyse de données avec une solide expérience en Python et SQL, motivée pour extraire des insights pertinents pour votre entreprise.",
    status: 'accepted',
    appliedDate: '2023-05-10',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const statusLabel = (status: string) => {
  if (status === 'accepted') return 'ACCEPTÉE';
  if (status === 'rejected') return 'REJETÉE';
  return 'EN ATTENTE';
};
const statusColor = (status: string) => {
  if (status === 'accepted') return 'success';
  if (status === 'rejected') return 'error';
  return 'warning';
};

const CompanyApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const application = mockApplications.find(app => app.id === id);

  if (!application) return <Typography>Aucune candidature trouvée.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="inherit"
          sx={{ minWidth: 0, p: 1, fontWeight: 600 }}
        >
          Retour
        </Button>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Détails de la candidature
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
        {/* Bloc gauche : Infos candidat */}
        <Card sx={{ minWidth: 320, flex: 1, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar src={application.avatar} alt={application.studentName} sx={{ width: 64, height: 64 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>{application.studentName}</Typography>
                <Typography variant="subtitle1" color="text.secondary">{application.offerTitle}</Typography>
                <Chip
                  label={statusLabel(application.status)}
                  color={statusColor(application.status) as any}
                  sx={{ mt: 1, fontWeight: 700 }}
                />
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Coordonnées
            </Typography>
            <Stack spacing={1} mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Mail fontSize="small" color="action" />
                <Typography variant="body2">{application.studentEmail}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone fontSize="small" color="action" />
                <Typography variant="body2">{application.studentPhone}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Event fontSize="small" color="action" />
                <Typography variant="body2">Candidature reçue le {new Date(application.appliedDate).toLocaleDateString()}</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Documents
            </Typography>
            <Button
              variant="outlined"
              startIcon={<InsertDriveFile />}
              sx={{ fontWeight: 600 }}
              onClick={() => navigate(`/entreprise/candidatures/${application.id}`)}
            >
              TÉLÉCHARGER LE CV
            </Button>
          </CardContent>
        </Card>
        {/* Bloc droit : Motivation + actions */}
        <Box flex={2}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Lettre de motivation
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {application.motivation}
              </Typography>
            </CardContent>
          </Card>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              sx={{ fontWeight: 600, minWidth: 220 }}
              // onClick={() => ...}
            >
              ACCEPTER LA CANDIDATURE
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              sx={{ fontWeight: 600, minWidth: 220 }}
              // onClick={() => ...}
            >
              REJETER LA CANDIDATURE
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CompanyApplicationDetail; 