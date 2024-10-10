// Import Firebase Admin SDK
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app"; // This prevents multiple initializations

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "next-ecommerce-219f6",
      clientEmail: "firebase-adminsdk-1718z@next-ecommerce-219f6.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0LoheEvOwozGl\n1ZLoYaKg8FnxY2XUq3ADro/QIhMVsdYhNNMf1GNsMDKQzWab2FFlFSj+JMdZ/5ep\nT0M/m984LkR5efzspGBf3qEsitO0S5pV9AbDpWPhdHXHSxxt8kudGh8Q7jC3S3pi\nGIA1t8uG3vfeJKREN1kks/5bL6Iwa329CNAtSzilvwee4Uceg/tmCU3Qng+VILk1\n+LelVmhYI/18z+dxHHJJLJCjAze4xfn7v4lDUjs2zjf/yccVcI3HR0sCSXdMaPCM\nT/IaYHI0R0oCiEnESk+HHun7IUF9eSPVtKJvFAZJw0/VLCuMTvw6VVFIfSuPo4go\nP26JpH31AgMBAAECggEAIlF8msJsVNf4dFgV95nlEldFIlNmyVdv6dudO6zJyseI\n++EmVzkqSKhzcR4WLZfJhQG/QYy6xZsHhXF54wsqvHYfh62i7WWvj4MFWskEYqJF\nvppQkYIWYJJAfpmBTDWqjj0z7pMXh0nigP2eqdyccM9WEaMUAIQ0P+fiifasIyF8\nSIL8l7y/y8muptCtqdT4RIm+6vnnPut3Nua0LpyLfUyDu6KzK5rCENAVl7021ITi\nSNel9l9sE8iXyZfrS8xIqD96KUjfPEmZfGgfA8wFPfvFjdVKHUpIxLaOPZyyUufb\nsdOAN45+SLRoOqXGLLvscsa3Bl5EgKc53XGpbvMjTwKBgQDbEx0gSVAgF2IGJgv6\nAgkileHBfJMFsF66g4TaAiYTzb56V8EOlyi5f43pSR4079hRhCjjJQjOCZyM/ote\nLN162zJvG1YU4VxvY/e0/59egLt+WB9P0umJ1aeqA3P1rJ3gYrQExo5uMH0dzX58\ntMHBEh56E3Ot1PVf3vUtuw/+PwKBgQDSjTkyloXOUFXMVYAMBDHf+HGOBAWUKr1L\nsIQl4hg4XWZ8XRGUJrUVsMp2VsVdUNhvgoK/y3b6M1KX4Gz04uG3KmJaX78Q+Yv4\nh0b+EpnsznamezEkd0/u8lFm6PvV6L7TembsNJowKrFDNHWLRPvxkVap+9ewOSnA\ntBvvzjWeywKBgGrch/iXyl3dChO1u2HYXFxigBzBh3Xe8lZIkSVGpwxB8Af9hk53\nrYXOkoqZAAMSe5JHxSoHhqP6TEL6Z0Eo4WBsS82mp/bHdy9etBW2Gycd5Fdc5Okr\nGIADmCV2Sbos2VX6z5UExbU6Mc23z1tFUL28+ODTXDoPByIcv7vu435BAoGAdqyo\n342dz6LSKUDL0noOzomPH5e+uTu5xE6yvVOJiUODv3cJsHJ8wMQL6dWQmr81ruxl\n28rHvdBtrjMN1p2G0aGvG/c5j0zIiwVci1parfHVSJLJKR+iyzCDlzicsX3lCPfF\nyT8A5UM69IE9+4ifZRIhQeA0OxyNHxOlZ23YJS8CgYAHmsuHp42h7jWQdGXA+M2V\ns/ZMBajizsAHWb/U6aqpuNbjCRaHF2ErA85Tz0kTISBooHOQe5JbyVomTr+qhqfl\nrdOznh125DIoGra+34Y40k6jkHEL3M9G/A6hvuTJcqB4Z0OSIOSDb0sdftvc4C9j\ng5zVySPdOF4fmJK/AEWJ3w==\n-----END PRIVATE KEY-----\n",
    }),
  });
}

// Export Firestore database for server-side operations
export const dbAdmin = admin.firestore();

// Optional: Export Firebase Auth (if needed for token verification)
export const authAdmin = admin.auth();

export default admin;
