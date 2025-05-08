import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';

interface Evaluation {
  id: string;
  studentName: string;
  projectTitle: string;
  technicalSkills: number;
  professionalSkills: number;
  autonomy: number;
  communication: number;
  overallPerformance: number;
  strengths: string;
  areasForImprovement: string;
  recommendations: string;
  finalComments: string;
}

const StudentEvaluation: React.FC = () => {
  const [evaluation, setEvaluation] = useState<Evaluation>({
    id: '',
    studentName: '',
    projectTitle: '',
    technicalSkills: 0,
    professionalSkills: 0,
    autonomy: 0,
    communication: 0,
    overallPerformance: 0,
    strengths: '',
    areasForImprovement: '',
    recommendations: '',
    finalComments: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (name: keyof Evaluation, value: number | null) => {
    if (value !== null) {
      setEvaluation(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    // Ici, vous pouvez ajouter la logique pour sauvegarder l'évaluation
    console.log('Évaluation soumise:', evaluation);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Évaluation de l'Étudiant
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  name="studentName"
                  label="Nom de l'étudiant"
                  value={evaluation.studentName}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  name="projectTitle"
                  label="Titre du projet"
                  value={evaluation.projectTitle}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Compétences Techniques
              </Typography>
              <Rating
                value={evaluation.technicalSkills}
                onChange={(_, value) => handleRatingChange('technicalSkills', value)}
                max={5}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Compétences Professionnelles
              </Typography>
              <Rating
                value={evaluation.professionalSkills}
                onChange={(_, value) => handleRatingChange('professionalSkills', value)}
                max={5}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Autonomie
              </Typography>
              <Rating
                value={evaluation.autonomy}
                onChange={(_, value) => handleRatingChange('autonomy', value)}
                max={5}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Communication
              </Typography>
              <Rating
                value={evaluation.communication}
                onChange={(_, value) => handleRatingChange('communication', value)}
                max={5}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" gutterBottom>
                Performance Globale
              </Typography>
              <Rating
                value={evaluation.overallPerformance}
                onChange={(_, value) => handleRatingChange('overallPerformance', value)}
                max={5}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="strengths"
                label="Points forts"
                value={evaluation.strengths}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="areasForImprovement"
                label="Axes d'amélioration"
                value={evaluation.areasForImprovement}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="recommendations"
                label="Recommandations"
                value={evaluation.recommendations}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="finalComments"
                label="Commentaires finaux"
                value={evaluation.finalComments}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="large"
              >
                Soumettre l'évaluation
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentEvaluation; 