import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || '';

const initialState = {
  contacts: [],
  contactStatuses: {},
  search: '',
  loading: false,
  error: null
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetch(`${API_URL}/api/contacts`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    const data = await response.json();
    return data.map((contact) => ({ ...contact, id: contact._id }));
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contact) => {
    const response = await fetch(`${API_URL}/api/contacts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    const data = await response.json();
    return { ...data, id: data._id };
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }) => {
    const response = await fetch(`${API_URL}/api/contacts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to update contact');
    const data = await response.json();
    return { ...data, id: data._id };
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id) => {
    const response = await fetch(`${API_URL}/api/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return id;
  }
);

export const fetchStatuses = createAsyncThunk(
  'contacts/fetchStatuses',
  async () => {
    const response = await fetch(`${API_URL}/api/statuses`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch statuses');
    const data = await response.json();
    
    const statusesObj = {};
    data.forEach(status => {
      statusesObj[status.name] = {
        id: status._id,
        count: status.count,
        bg: status.color
      };
    });
    return statusesObj;
  }
);

export const createStatus = createAsyncThunk(
  'contacts/createStatus',
  async ({ statusName, bg }) => {
    const response = await fetch(`${API_URL}/api/statuses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: statusName, color: bg })
    });
    if (!response.ok) throw new Error('Failed to create status');
    const data = await response.json();
    return { name: data.name, id: data._id, bg: data.color, count: 0 };
  }
);

export const updateStatus = createAsyncThunk(
  'contacts/updateStatus',
  async ({ id, oldStatusName, statusName, bg }) => {
    const response = await fetch(`${API_URL}/api/statuses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: statusName, color: bg })
    });
    if (!response.ok) throw new Error('Failed to update status');
    const data = await response.json();
    return { oldName: oldStatusName, newName: data.name, id: data._id, bg: data.color };
  }
);

export const removeStatus = createAsyncThunk(
  'contacts/removeStatus',
  async ({ id, statusName }) => {
    const response = await fetch(`${API_URL}/api/statuses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete status');
    return statusName;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        const statusName = action.payload.status;
        if (state.contactStatuses[statusName]) {
          state.contactStatuses[statusName].count += 1;
        }
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          const oldStatus = state.contacts[index].status;
          const newStatus = action.payload.status;
          
          if (oldStatus !== newStatus) {
            if (state.contactStatuses[oldStatus]) {
              state.contactStatuses[oldStatus].count -= 1;
            }
            if (state.contactStatuses[newStatus]) {
              state.contactStatuses[newStatus].count += 1;
            }
          }
          
          state.contacts[index] = action.payload;
        }
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        const contact = state.contacts.find(c => c.id === action.payload);
        if (contact && state.contactStatuses[contact.status]) {
          state.contactStatuses[contact.status].count -= 1;
        }
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      })
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.contactStatuses = action.payload;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStatus.fulfilled, (state, action) => {
        state.contactStatuses[action.payload.name] = {
          id: action.payload.id,
          count: action.payload.count,
          bg: action.payload.bg
        };
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const { oldName, newName, id, bg } = action.payload;
        if (state.contactStatuses[oldName]) {
          const count = state.contactStatuses[oldName].count;
          delete state.contactStatuses[oldName];
          state.contactStatuses[newName] = { id, count, bg };
          
          state.contacts.forEach(contact => {
            if (contact.status === oldName) {
              contact.status = newName;
            }
          });
        }
      })
      .addCase(removeStatus.fulfilled, (state, action) => {
        delete state.contactStatuses[action.payload];
        
        state.contacts.forEach(contact => {
          if (contact.status === action.payload) {
            contact.status = 'others';
          }
        });
      });
  }
});

export const { setSearch } = contactsSlice.actions;

export default contactsSlice.reducer;
