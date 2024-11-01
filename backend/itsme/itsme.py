
# As we don't really use Itsme, we simulate the calls here.

def get_itsme_token(username):
    return "".join([chr((ord(c)+i % 128)) for i,c in enumerate(username)])


def get_itsme_name(token):
    return "".join([chr((ord(c)-i % 128)) for i,c in enumerate(token)])
