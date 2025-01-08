import React, { useState } from 'react';
import { getBackend } from '@/services/backend';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PhoneInput } from './PhoneInput';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const FirstTimeForm: React.FC<FirstTimeFormProps> = ({ user, onSubmit }) => {
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.name || '');
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [status, setStatus] = useState(user.status || 'student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const backend = getBackend();
      await backend.upsertUser({
        user_id: user.id,
        firstname,
        lastname,
        email,
        phone,
        status,
      });
      console.log('FirstTime: User updated successfully');

      // Créer un CustomEvent avec des données
      const profileEvent = new CustomEvent('profileUpdated', {
        detail: { userId: user.id, success: true },
      });
      window.dispatchEvent(profileEvent);

      // Attendre un peu avant la redirection
      setTimeout(() => {
        onSubmit();
      }, 100);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-md"
    >
      <h2 className="mb-4 text-xl font-bold">
        {t('dashboard.firstimeForm.title')}
      </h2>
      <div className="mb-4">
        <Label className="mb-2 block font-medium text-gray-700">
          {t('dashboard.firstimeForm.firstname')}
        </Label>
        <Input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('dashboard.firstimeForm.firstnameLabel')}
          required
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2 block font-medium text-gray-700">
          {t('dashboard.firstimeForm.name')}
        </Label>
        <Input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('dashboard.firstimeForm.nameLabel')}
          required
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2 block font-medium text-gray-700">
          {t('dashboard.firstimeForm.email')}
        </Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('dashboard.firstimeForm.emailLabel')}
          required
          disabled
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2 block font-medium text-gray-700">
          {t('dashboard.firstimeForm.phone')}
        </Label>
        {/* <Input
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('dashboard.firstimeForm.phoneLabel')}
			  /> */}
        <PhoneInput value={phone} onChange={setPhone} />
      </div>
      <div className="mb-4">
        <Label className="mb-2 block font-medium text-gray-700">
          {t('dashboard.firstimeForm.statut')}
        </Label>
        <Select
          value={status}
          onValueChange={(value) =>
            setStatus(
              value as 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other'
            )
          }
        >
          <SelectTrigger className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder={t('dashboard.firstimeForm.statut')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="student">
                {t('dashboard.firstimeForm.student')}
              </SelectItem>
              <SelectItem value="pupil">
                {t('dashboard.firstimeForm.pupil')}
              </SelectItem>
              <SelectItem value="apprentice">
                {t('dashboard.firstimeForm.apprentice')}
              </SelectItem>
              <SelectItem value="teacher">
                {t('dashboard.firstimeForm.teacher')}
              </SelectItem>
              <SelectItem value="other">
                {t('dashboard.firstimeForm.other')}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        disabled={loading}
      >
        {loading
          ? t('dashboard.firstimeForm.loading')
          : t('dashboard.firstimeForm.submit')}
      </button>
    </form>
  );
};

export default FirstTimeForm;
