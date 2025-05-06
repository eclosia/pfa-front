import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  ThemeProvider,
  createTheme,
  InputLabel,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import * as Icons from '@mui/icons-material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

interface Offer {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: "STAGE" | "CDI" | "CDD";
  status: "ACTIVE" | "ARCHIVÉE";
  createdAt: string;
  applicationsCount: number;
}

interface Application {
  id: string;
  offerId: string;
  name: string;
  email: string;
  phone: string;
  cv: string;
  motivation: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: Date;
}

const CompanyOffers: React.FC = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      title: "Développeur Full Stack",
      description: "Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe et contribuer à des projets innovants.",
      requirements: [
        "5 ans d'expérience en développement web",
        "Maîtrise de React et Node.js",
        "Connaissance des bases de données SQL et NoSQL",
        "Expérience avec les architectures microservices"
      ],
      location: "Casablanca",
      type: "CDI",
      status: "ACTIVE",
      createdAt: "01/05/2024",
      applicationsCount: 12
    }
  ]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: "",
    description: "",
    requirements: [],
    location: "",
    type: "STAGE",
    status: "ACTIVE"
  });

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  const handleOpenModal = (offer?: Offer) => {
    if (offer) {
      setSelectedOffer(offer);
      setFormData(offer);
    } else {
      setSelectedOffer(null);
      setFormData({
        title: "",
        description: "",
        requirements: [],
        location: "",
        type: "STAGE",
        status: "ACTIVE"
      });
    }
    setOpenOfferDialog(true);
  };

  const handleCloseModal = () => {
    setOpenOfferDialog(false);
    setSelectedOffer(null);
    setFormData({
      title: "",
      description: "",
      requirements: [],
      location: "",
      type: "STAGE",
      status: "ACTIVE"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOffer) {
      setOffers(offers.map(offer =>
        offer.id === selectedOffer.id ? { ...offer, ...formData } : offer
      ));
    } else {
      const newOffer: Offer = {
        ...formData as Offer,
        id: offers.length + 1,
        createdAt: new Date().toLocaleDateString(),
        applicationsCount: 0
      };
      setOffers([...offers, newOffer]);
    }
    handleCloseModal();
  };

  const handleArchive = (offerId: number) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, status: "ARCHIVÉE" } : offer
    ));
  };

  const handleDelete = (offerId: number) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const handleApplicationStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" color="text.primary">
            Gestion des Offres de Stage/Projet
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Icons.Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              size="small"
              sx={{ width: 200 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenModal()}
            >
              Nouvelle offre
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
          {filteredOffers.map((offer) => (
            <Card key={offer.id} sx={{ bgcolor: 'background.paper' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" color="text.primary">
                    {offer.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Voir les candidatures">
                      <IconButton size="small" onClick={() => setSelectedOffer(offer)}>
                        <Icons.Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Archiver">
                      <IconButton 
                        size="small" 
                        onClick={() => handleArchive(offer.id)}
                        disabled={offer.status === "ARCHIVÉE"}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton color="error" onClick={() => handleDelete(offer.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip 
                    label={offer.type} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={offer.location} 
                    size="small" 
                    color="secondary" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={offer.status === "ACTIVE" ? 'Active' : 'Archivée'} 
                    size="small" 
                    color={offer.status === "ACTIVE" ? 'success' : 'default'} 
                  />
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  {offer.location} - {offer.requirements.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {offer.description}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Prérequis:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {offer.requirements.map((skill, index) => (
                      <Chip 
                        key={index} 
                        label={skill} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {offer.applicationsCount} candidature(s)
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedOffer(offer)}
                  >
                    Voir les candidatures
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog
          open={openOfferDialog}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedOffer ? "Modifier l'offre" : "Nouvelle offre"}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Titre"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={formData.type}
                        label="Type"
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as Offer["type"] })}
                      >
                        <MenuItem value="STAGE">Stage</MenuItem>
                        <MenuItem value="CDI">CDI</MenuItem>
                        <MenuItem value="CDD">CDD</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label="Localisation"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Prérequis (un par ligne)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.requirements?.join("\n")}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split("\n") })}
                    required
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="error">
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedOffer ? "Modifier" : "Créer"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Dialog pour voir les candidatures */}
        <Dialog
          open={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedOffer && (
            <>
              <DialogTitle>
                Candidatures pour {selectedOffer.title}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  {applications
                    .filter(app => app.offerId === selectedOffer.id.toString())
                    .map(application => (
                      <Card key={application.id} sx={{ bgcolor: 'background.paper' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6" color="text.primary">
                                {application.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {application.email} - {application.phone}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                color="success"
                                startIcon={<Icons.CheckCircle />}
                                onClick={() => handleApplicationStatusChange(application.id, 'accepted')}
                                disabled={application.status === 'accepted'}
                              >
                                Accepter
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                startIcon={<Icons.Cancel />}
                                onClick={() => handleApplicationStatusChange(application.id, 'rejected')}
                                disabled={application.status === 'rejected'}
                              >
                                Rejeter
                              </Button>
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            {application.motivation}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedOffer(null)}>
                  Fermer
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default CompanyOffers; 